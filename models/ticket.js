const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    departmentID: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartmentID: {
      type: mongoose.Types.ObjectId,
      ref: "SubDepartment",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    answer: {
      type: Number,
      required: true,
    },
    periority: {
      type: Number,
      required: true,
    },
    isAnswer: {
      type: Number,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "Ticket",
    },
  },
  { timestamps: true },
);
const model = mongoose.model("Ticket", schema);
module.exports = model;
