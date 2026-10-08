const mongoose = require("mongoose");

const schema = mongoose.Schema({
  phone: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

const model = mongoose.model("BanUser", schema);
module.exports = model;
