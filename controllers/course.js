const { isValidObjectId } = require("mongoose");
const courseModel = require("../models/course");
const categoryModel = require("../models/category");
const courseUserModel = require("../models/course-user");
const sessionModel = require("../models/session");
const commentModel = require("../models/comment");
const validator = require("../validators/course");
const fs = require("fs");

exports.create = async (req, res) => {
  const isValidInfo = validator(req.body);
  if (!isValidInfo) {
    return res.status(422).json({ isValidInfo });
  }
  const {
    name,
    description,
    support,
    discount,
    category,
    price,
    status,
    href,
  } = req.body;
  const course = await courseModel.create({
    name,
    description,
    support,
    discount,
    category,
    creator: req.user._id,
    price,
    status,
    href,
    cover: req.file.filename,
  });

  if (!course) {
    return res
      .status(403)
      .json({ message: "course do not created, there's a problem" });
  }

  fs.mkdir(`./public/courses/${name}`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return res.json({ course });
};

exports.getAll = async (req, res) => {
  const courses = await courseModel
    .find({})
    .populate("category")
    .populate(
      "creator",
      "-password -email -phone -role -username -createdAt -updatedAt -__v",
    );
  return res.json(courses);
};

exports.createSession = async (req, res) => {
  const { id } = req.params;
  const { title, time, free } = req.body;
  const session = await sessionModel.create({
    course: id,
    title,
    time,
    free,
    video: req.file.filename,
  });

  return res.status(201).json(session);
};

exports.getAllSessions = async (req, res) => {
  const sessions = await sessionModel
    .find({})
    .populate("course", "name -_id")
    .lean();
  res.json(sessions);
};

exports.getOneSessionInfo = async (req, res) => {
  const course = await courseModel.findOne({ href: req.params.href }).lean();
  const session = await sessionModel.findOne({ _id: req.params.sessionID });

  const allSessionsOfCourse = await sessionModel.find({ course: course._id });

  return res.json({ session, allSessionsOfCourse });
};

exports.removeOneSession = async (req, res) => {
  const { id } = req.params;
  const isValidID = isValidObjectId(id);

  if (!isValidID) {
    return res.status(409).json({ message: "invalid id" });
  }

  const deletedSession = await sessionModel.findOneAndDelete({ _id: id });
  if (!deletedSession) {
    return res.status(422).json({ message: "no such session" });
  }

  return res.json(deletedSession);
};

exports.registerOneStudent = async (req, res) => {
  const isUserAlreadyRegistered = await courseUserModel.findOne({
    user: req.user._id,
    course: req.params.id,
  });
  if (isUserAlreadyRegistered) {
    return res.status(403).json({ message: "user already registerd" });
  }

  const register = await courseUserModel.create({
    course: req.params.id,
    price: req.body.price,
    user: req.user._id,
  });

  return res.status(201).json({ message: "user registered successfully" });
};

exports.getCoursesByCategory = async (req, res) => {
  const { href } = req.params;
  const category = await categoryModel.findOne({ href });

  if (category) {
    const courses = await courseModel.find({ category: category._id });
    return res.json(courses);
  } else {
    return res.status(403).json({ message: "no such category" });
  }
};

exports.getCourseAllDetails = async (req, res) => {
  const course = await courseModel
    .findOne({ href: req.params.href })
    .populate("creator", "name email")
    .populate("category");

  if (!course) {
    return res.json({ message: "no such course" });
  }

  const sessions = await sessionModel.find({ course: course._id });

  const comments = await commentModel
    .find({ course: course._id, isAccept: 1 })
    .populate("creator", "name");

  const courseStudentsCount = await courseUserModel
    .find({ course: course._id })
    .countDocuments();

  const isUserRegisteredInThisCourse = Boolean(
    await courseUserModel.findOne({
      user: req.user._id,
      course: course._id,
    }),
  );

  res.json({
    course,
    sessions,
    comments,
    courseStudentsCount,
    isUserRegisteredInThisCourse,
  });
};

exports.removeOneCourse = async (req, res) => {
  const isValidID = isValidObjectId(req.params.id);
  if (!isValidID) {
    return res.status(404).json({ message: "course not found" });
  }
  const deletedCourse = await courseModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!deletedCourse) {
    return res.status(404).json({ message: "course not found" });
  }

  return res.json(deletedCourse);
};
