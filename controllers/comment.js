const commentModel = require("../models/comment");
const courseModel = require("../models/course");

exports.createCommnet = async (req, res) => {
  const { courseHref, body, score } = req.body;
  const course = await courseModel.findOne({ href: courseHref });

  if (!course) {
    return res.status(409).json({ message: "no such course" });
  }

  const comment = await commentModel.create({
    body,
    course: course._id,
    score,
    creator: req.user._id,
    isAnswer: 0,
    isAccept: 0,
  });

  res.status(201).json(comment);
};

exports.removeComment = async (req, res) => {
  const { id } = req.params;
  const deletedComment = await commentModel.findOneAndDelete({ _id: id });
  if (!deletedComment) {
    return res.status(404).json({ message: "comment not found" });
  }
  return res.json(deletedComment);
};

exports.acceptComment = async (req, res) => {
  const acceptedComment = await commentModel.findOneAndUpdate(
    { _id: req.params.id },
    { isAccept: 1 },
  );
  if (!acceptedComment) {
    return res.status(404).json({ message: "comment not found" });
  }

  return res.json({ message: "accepted successfully" });
};

exports.rejectComment = async (req, res) => {
  const rejectedComment = await commentModel.findOneAndUpdate(
    { _id: req.params.id },
    { isAccept: 0 },
  );
  if (!rejectedComment) {
    return res.status(404).json({ message: "comment not found" });
  }
  return res.json({ message: "rejected successfully" });
};

exports.answer = async (req, res) => {
  const { body } = req.body;
  const acceptedComment = await commentModel.findOneAndUpdate(
    { _id: req.params.id },
    { isAccept: 1 },
  );

  if (!acceptedComment) {
    return res.status(404).json({ message: "comment not found" });
  }

  const answerComment = await commentModel.create({
    body,
    course: acceptedComment.course,
    creator: req.user._id,
    isAnswer: 1,
    isAccept: 1,
    mainCommentID: req.params.id,
  });

  return res.status(201).json(answerComment);
};

exports.getAllComments = async (req, res) => {
  const comments = await commentModel
    .find({})
    .populate("course")
    .populate("creator", "-password")
    .lean();

  let allComments = [];

  comments.forEach((comment) => {
    const isHasMainCommentProp = Object.hasOwn(comment, "mainCommentID");

    comments.forEach((answerComment) => {
      if (String(comment._id) === String(answerComment.mainCommentID)) {
        allComments.push({
          ...comment,
          creator: req.user.name,
          course: comment.course,
          answerComment,
        });
      }
    });
    if (!isHasMainCommentProp) {
      allComments.push(comment);
    }
    if (isHasMainCommentProp) {
      allComments.pop(comment);
    }
  });

  res.json(allComments);
};
