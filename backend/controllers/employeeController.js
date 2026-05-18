const { validationResult } = require("express-validator");
const Employee = require("../models/Employee");

exports.addEmployee = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const { name, email, department, skills, performanceScore, experience } =
    req.body;
  try {
    const existing = await Employee.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Employee email already exists" });

    const employee = new Employee({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
      createdBy: req.user.id,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ performanceScore: -1 });
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

exports.searchEmployees = async (req, res, next) => {
  try {
    const { department, email, name } = req.query;
    const query = {};
    if (department) query.department = new RegExp(department, "i");
    if (email) query.email = new RegExp(email, "i");
    if (name) query.name = new RegExp(name, "i");

    const employees = await Employee.find(query).sort({ performanceScore: -1 });
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    const updates = req.body;
    Object.assign(employee, updates);
    await employee.save();
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
};
