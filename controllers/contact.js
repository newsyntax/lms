const { default: mongoose } = require("mongoose");
const contactModel = require("../models/contacts");

exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({});
  res.json(contacts);
};

exports.create = async (req, res) => {
  const { body, phone, name, email } = req.body;
  if (!body || !phone || !name) {
    return res.status(499).json({ message: "invalid information" });
  }

  try {
    const contactInfo = await contactModel.create({
      name,
      phone,
      body,
      answer: 0,
      email,
    });
    return res.status(201).json(contactInfo);
  } catch (error) {
    return res.json(error);
  }
};

exports.answer = async (req, res) => {};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const isValidID = mongoose.isValidObjectId(id);
  if (isValidID) {
    const isExists = await contactModel.findOne({ _id: id });
    if (!isExists) {
      return res.json({ message: "not found" });
    }
  } else {
    return res.json({ message: "invalid id" });
  }

  try {
    const deletedContactsInfo = await contactModel.findOneAndDelete({
      _id: id,
    });
    return res.json({
      message: "deleted successfully",
      name: deletedContactsInfo.name,
      body: deletedContactsInfo.body,
    });
  } catch (error) {
    return res.json(error);
  }
};
