const https = require("https");
const axios = require("axios");
const { validationResult } = require("express-validator");

exports.generateRecommendation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const { summary } = req.body;

  try {
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey)
      return res.status(500).json({ message: "AI API key is not configured" });

    const { recommendationType = "all" } = req.body;

    const typeLabel = {
      promotion: "Promotion Recommendation",
      training: "Training Suggestions",
      ranking: "Employee Ranking",
      feedback: "AI Feedback",
      all: "Promotion, Training, Ranking, and Feedback",
    }[recommendationType];

    // Always fetch employees from DB so the AI has the full context
    const Employee = require("../models/Employee");
    const rankedEmployees = await Employee.find()
      .select("name email department skills performanceScore experience")
      .sort({ performanceScore: -1 })
      .lean();

    const employeesListText = rankedEmployees
      .map(
        (e, idx) =>
          `${idx + 1}. ${e.name} — ${e.department} — Score: ${e.performanceScore} — Exp: ${e.experience} — Skills: ${(e.skills || []).join(", ")}`,
      )
      .join("\n");

    const employeeContext = `\n\nEmployees list (highest score first):\n${employeesListText}`;

    const prompt = `You are an HR analytics assistant. You will be provided with the user's selected task (one of: promotion, training, ranking, feedback, all) and a summary or scenario. You MUST ONLY output a valid JSON object (no additional text) with the following structure:\n{\n  "selectedEmployees": [ { "name": "", "email": "", "department": "", "performanceScore": 0, "experience": 0, "skills": [""], "reason": "" }, ... ],\n  "explanation": "A short explanation of why these employees were selected and suggested next steps."\n}\n\nTask: ${typeLabel}\n\nScenario / User input:\n${summary}\n${employeeContext}\n\nBased on the task, select and return the relevant employees and a concise explanation. For 'promotion' choose employees suitable for promotion. For 'training' choose employees who need upskilling. For 'ranking' return the ranked list. For 'feedback' provide feedback and select employees that need attention. Do not include any formatting outside the JSON.`;

    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    if (process.env.AI_SKIP_SSL_VERIFY === "true") {
      requestConfig.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    }

    const response = await axios.post(
      process.env.AI_API_URL || "https://openrouter.ai/api/v1/chat/completions",
      {
        model: process.env.AI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an intelligent assistant that crafts concise employee development recommendations and MUST output only JSON following the specified schema.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 800,
      },
      requestConfig,
    );

    const aiText =
      response.data?.choices?.[0]?.message?.content ||
      response.data?.result ||
      "No recommendation available.";

    // Try parse JSON output from model
    let parsed = null;
    try {
      parsed = JSON.parse(aiText);
    } catch (err) {
      // Try to extract JSON substring
      const m = aiText.match(/\{[\s\S]*\}/);
      if (m) {
        try {
          parsed = JSON.parse(m[0]);
        } catch (e) {
          parsed = null;
        }
      }
    }

    const resultPayload = { recommendation: aiText.trim() };
    if (parsed) resultPayload.parsed = parsed;
    // always include current ranked employees for reference
    if (rankedEmployees && rankedEmployees.length)
      resultPayload.rankedEmployees = rankedEmployees;
    res.json(resultPayload);
  } catch (error) {
    next(error);
  }
};
