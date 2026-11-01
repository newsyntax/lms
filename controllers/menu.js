const menuModel = require("../models/menu");

exports.getAll = async (req, res) => {
  // Code ...
};
exports.create = async (req, res) => {
  const { title, parent, href } = req.body;
  const menu = await menuModel.create({ title, parent, href });
  res.status(201).json(menu);
};
exports.getAllInPanel = async (req, res) => {
  const menu = await menuModel.find({}).populate("parent").lean();
  res.json(menu);
};
exports.remove = async (req, res) => {
  await menuModel.deleteOne({ _id: req.params.id });
  res.json({ message: "menu removed successfully" });
};
