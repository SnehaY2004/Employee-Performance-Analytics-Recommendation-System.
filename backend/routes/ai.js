const express = require("express");
const { body } = require("express-validator");
const authenticate = require("../middleware/auth");
const { generateRecommendation } = require("../controllers/aiController");
const router = express.Router();

router.post(
  "/recommend",
  authenticate,
  [
    body("summary").trim().notEmpty().withMessage("Summary is required"),
    body("recommendationType")
      .optional()
      .isIn(["promotion", "training", "ranking", "feedback", "all"])
      .withMessage("Invalid recommendation type"),
    body("useSavedEmployees")
      .optional()
      .isBoolean()
      .withMessage("useSavedEmployees must be boolean"),
  ],
  generateRecommendation,
);

module.exports = router;
