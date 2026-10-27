const notificationModel = require("../models/notification");

exports.getOne = async (req, res) => {
  const { adminID } = req.params;

  const nofits = await notificationModel.find({ admin: adminID });
  res.json(nofits);
};

exports.getAll = async (req, res) => {
  const nofits = await notificationModel.find({});
  res.json(nofits);
};

exports.create = async (req, res) => {
  const { message, admin } = req.body;
  const notif = await notificationModel.create({ message, admin });
  res.status(201).json(notif);
};

exports.seen = async (req, res) => {
  const { id } = req.params;

  await notificationModel.findOneAndUpdate({ _id: id }, { seen: 1 });
  return res.json({ message: "notif seen " });
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await notificationModel.deleteOne({ _id: id });
  res.json({ message: "notife deleted successfully" });
};
