const departmentsModel = require("../models/department");
const subsDepartmentModel = require("../models/sub-department");

exports.create = async (req, res) => {};

exports.getAll = async (req, res) => {
  // Code ...
};

exports.userTickets = async (req, res) => {
  // Code ...
};

exports.createDepartment = async (req, res) => {
  const { title } = req.body;
  const department = await departmentsModel.create({ title });
  res.status(201).json(department);
};

exports.createSub = async (req, res) => {
  const { title } = req.body;
  const sub = await subsDepartmentModel.create({
    title,
    parent: req.params.id,
  });
  res.json(sub);
};

exports.departments = async (req, res) => {
  const department = await departmentsModel.find();
  res.json(department);
};

exports.departmentSubs = async (req, res) => {
  const subs = await subsDepartmentModel
    .find({ parent: req.params.id })
    .populate("parent", "title");
  res.json(subs);
};

exports.setAnswer = async (req, res) => {
  // Code ...
};

exports.getAnswer = async (req, res) => {
  // Code ...
};
