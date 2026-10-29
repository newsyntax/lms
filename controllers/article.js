const articlesModel = require("../models/article");

exports.getAll = async (req, res) => {
  const articles = await articlesModel.find({});
  res.json(articles);
};
exports.create = async (req, res) => {
  const { title, decription, body, href, tags, category } = req.body;

  const newArticleInfo = {
    title,
    decription,
    body,
    href,
    cover: req.file.filename,
    tags: tags.split(", "),
    category,
    creator: req.user._id,
  };

  const newArticle = await articlesModel.create(newArticleInfo);
  res.status(201).json(newArticle);
};
exports.removeOne = async (req, res) => {
  const { id } = req.params;
  await articlesModel.deleteOne({ _id: id });
  res.json("article removed successfully");
};
exports.saveDraft = async (req, res) => {
  const { id } = req.params;
  await articlesModel.updateOne({ _id: id }, { publish: 0 });
  res.json({ message: "article save into drafts" });
};
exports.getOne = async (req, res) => {};
