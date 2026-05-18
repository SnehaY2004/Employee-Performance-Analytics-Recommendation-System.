import { useState } from "react";
import { generateRecommendation } from "../api/api";

const Recommendations = ({ token }) => {
  const [summary, setSummary] = useState("");
  const [recommendationType, setRecommendationType] = useState("all");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [rawRecommendation, setRawRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const promptExamples = [
    "High performance employee with strong leadership potential.",
    "Low score employee with missing database skills and need for training.",
    "Senior developer with strong technical skills but low cross-team collaboration.",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSelectedEmployees([]);
    setExplanation("");
    setRawRecommendation("");
    setLoading(true);
    try {
      const response = await generateRecommendation(
        token,
        summary,
        recommendationType,
      );
      const raw = response.data.recommendation || "";
      setRawRecommendation(raw);
      const parsed = response.data.parsed;
      if (parsed && Array.isArray(parsed.selectedEmployees)) {
        setSelectedEmployees(parsed.selectedEmployees);
        setExplanation(parsed.explanation || "");
      } else if (Array.isArray(response.data.rankedEmployees)) {
        setSelectedEmployees(response.data.rankedEmployees);
        setExplanation("Ranked employees from the database.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to generate recommendation.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          AI Recommendation Center
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Generate training, promotion, and ranking advice for employees.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Recommendation type
            </label>
            <select
              value={recommendationType}
              onChange={(e) => setRecommendationType(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
            >
              <option value="all">All recommendations</option>
              <option value="promotion">Promotion recommendation</option>
              <option value="training">Training suggestions</option>
              <option value="ranking">Employee ranking</option>
              <option value="feedback">AI feedback</option>
            </select>
            <label className="block text-sm font-medium text-slate-700">
              Employee summary or scenario
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows="8"
              className="w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
              placeholder="Paste employee highlights and performance metrics here."
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate Recommendation"}
            </button>
            {error && <p className="text-sm text-rose-600">{error}</p>}
          </form>
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">
              Prompt examples
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {promptExamples.map((example) => (
                <li key={example} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">
            Recommendation Output
          </h3>
          <div className="mt-4 min-h-[220px] rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
            {explanation ? (
              <div className="space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <h4 className="text-lg font-semibold text-slate-900">
                    AI Summary
                  </h4>
                  <p className="mt-2 text-slate-700 whitespace-pre-wrap">
                    {explanation}
                  </p>
                </div>
                {selectedEmployees.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      Selected Employees
                    </h4>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      {selectedEmployees.map((employee, index) => (
                        <div
                          key={employee.email || index}
                          className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-base font-semibold text-slate-900">
                                {employee.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {employee.email}
                              </p>
                              <p className="mt-2 text-sm text-slate-700">
                                {employee.department}
                              </p>
                            </div>
                            <div className="text-right text-sm text-slate-700">
                              <p>Score: {employee.performanceScore}</p>
                              <p>Exp: {employee.experience} yrs</p>
                            </div>
                          </div>
                          {employee.skills?.length > 0 && (
                            <p className="mt-3 text-xs text-slate-600">
                              Skills: {employee.skills.join(", ")}
                            </p>
                          )}
                          {employee.reason && (
                            <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                              {employee.reason}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* {rawRecommendation && (
                  <div className="rounded-3xl bg-white p-4 border border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-900">
                      Raw AI Response
                    </h4>
                    <pre className="mt-2 whitespace-pre-wrap text-slate-700">
                      {rawRecommendation}
                    </pre>
                  </div>
                )} */}
              </div>
            ) : rawRecommendation ? (
              <pre className="whitespace-pre-wrap">{rawRecommendation}</pre>
            ) : (
              <p className="text-slate-500">
                AI recommendations appear here after submission.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Recommendations;
