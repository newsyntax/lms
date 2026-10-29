const articlesModel = require("../models/article");

exports.getAll = async (req, res) => {
  const articles = await articlesModel.find({});
  res.json(articles);
};
exports.create = async (req, res) => {
  const { title, decription, body, href, publish, tags, category } = req.body;

  const newArticleInfo = {
    title,
    decription,
    body,
    href,
    cover: req.file.filename,
    publish,
    tags: tags.split(", "),
    category,
    creator: req.user._id,
  };

  const newArticle = await articlesModel.create(newArticleInfo);
  res.status(201).json(newArticle);
};
exports.removeOne = async (req, res) => {};
exports.saveDraft = async (req, res) => {};
exports.getOne = async (req, res) => {};
