const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      uniquie: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "USER", "AUTHOR"],
      default: "USER",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const model = mongoose.model("User", schema);

module.exports = model;
