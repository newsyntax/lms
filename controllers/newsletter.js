const newsletterModel = require("./../models/newsletter");

exports.getAll = async (req, res) => {
  const newsLetters = await newsletterModel.find({});
  res.json(newsLetters);
};

exports.create = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ message: "fill out email field" });
  }

  await newsletterModel.create({ email });
  res.status(201).json({ message: "newsletter set successfully" });
};
