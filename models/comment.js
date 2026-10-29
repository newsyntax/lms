const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 5,
    },
    isAnswer: {
      type: Number,
      require: true,
    },
    isAccept: {
      type: Number,
      require: true,
    },
    mainCommentID: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    article: {
      type: mongoose.Types.ObjectId,
      ref: "Article",
    },
  },
  { timestamps: true },
);

const model = mongoose.model("Comment", schema);
module.exports = model;
