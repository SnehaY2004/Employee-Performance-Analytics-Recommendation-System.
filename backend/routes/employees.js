const express = require("express");
const { body, param } = require("express-validator");
const {
  addEmployee,
  getEmployees,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const authenticate = require("../middleware/auth");
const router = express.Router();

router.use(authenticate);

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("department").trim().notEmpty().withMessage("Department is required"),
    body("skills").isArray().withMessage("Skills must be an array"),
    body("performanceScore")
      .isInt({ min: 0, max: 100 })
      .withMessage("Performance score must be between 0 and 100"),
    body("experience").isInt({ min: 0 }).withMessage("Experience is required"),
  ],
  addEmployee,
);

router.get("/", getEmployees);
router.get("/search", searchEmployees);

router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Valid employee ID is required"),
    body("performanceScore")
      .optional()
      .isInt({ min: 0, max: 100 })
      .withMessage("Performance score must be between 0 and 100"),
    body("skills").optional().isArray().withMessage("Skills must be an array"),
  ],
  updateEmployee,
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Valid employee ID is required")],
  deleteEmployee,
);

module.exports = router;
