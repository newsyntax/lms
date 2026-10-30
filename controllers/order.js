const { default: mongoose } = require("mongoose");
const courseUserModel = require("../models/course-user");

exports.getAll = async (req, res) => {
  const orders = await courseUserModel
    .find({ user: req.user._id })
    .populate("course", "name href")
    .lean();
  res.json(orders);
};

exports.getOne = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.isValidObjectId(id);
  if (!isValidID) {
    return res.json({ message: "invalid id" });
  }

  const order = await courseUserModel.findOne({ _id: id });
  res.json(order);
};
