const offModel = require("./../models/off");
const coursesModel = require("./../models/course");

exports.getAll = async (req, res) => {
  const offerCodes = await offModel.find({});
  res.json(offerCodes);
};

exports.create = async (req, res) => {
  const { code, percent, useCount, max, course } = req.body;
  const newOffCode = await offModel.create({
    code,
    percent,
    useCount,
    max,
    course,
    creator: req.user._id,
  });

  res.status(201).json(newOffCode);
};

exports.setOffOnAll = async (req, res) => {
  const { discount } = req.body;
  const coursesDiscounts = await coursesModel.updateMany(
    {},
    {
      discount,
    },
  );

  return res.json({ message: "offer set on all courses successfully" });
};

exports.removeOne = async (req, res) => {};

exports.getOne = async (req, res) => {};
