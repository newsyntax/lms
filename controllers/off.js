const offModel = require("./../models/off");
const coursesModel = require("./../models/course");

exports.getAll = async (req, res) => {
  const offerCodes = await offModel.find({});
  res.json(offerCodes);
};

exports.create = async (req, res) => {};

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
