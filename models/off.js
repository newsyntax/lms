const mongoose = require("mongoose");
const schema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
  useCount: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const model = mongoose.model("Off", schema);
module.exports = model;
