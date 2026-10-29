const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    decription: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    publish: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const model = mongoose.model("Article", schema);
