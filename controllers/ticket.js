const departmentsModel = require("../models/department");
const subsDepartmentModel = require("../models/sub-department");
const ticketModel = require("../models/ticket");

exports.create = async (req, res) => {
  const { departmentID, subDepartmentID, title, body, periority } = req.body;

  try {
    const ticket = await ticketModel.create({
      departmentID,
      subDepartmentID,
      user: req.user._id,
      title,
      body,
      answer: 0,
      periority,
      isAnswer: 0,
    });
    res.status(201).json(ticket);
  } catch (error) {
    return res.json({ message: "somthing went wrong" });
  }
};

exports.getAll = async (req, res) => {
  const tickets = await ticketModel.find();
  res.json(tickets);
};

exports.userTickets = async (req, res) => {
  const tickets = await ticketModel.find({ user: req.user._id });
  res.json(tickets);
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
