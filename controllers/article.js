const articlesModel = require("../models/article");

exports.getAll = async (req, res) => {
  const articles = await articlesModel.find({});
  res.json(articles);
};
exports.create = async (req, res) => {};
exports.removeOne = async (req, res) => {};
exports.saveDraft = async (req, res) => {};
exports.getOne = async (req, res) => {};
