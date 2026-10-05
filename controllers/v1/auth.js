const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("../../validators/register");
require("dotenv").config();

exports.signup = async (req, res) => {
  const isValidInfo = validator(req.body);
  if (!isValidInfo) {
    return res.status(422).json({ isValidInfo });
  }

  const { username, name, email, phone, password } = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({ message: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 18);
  const user = await userModel.create({
    username,
    email,
    name,
    phone,
    password: hashedPassword,
  });

  const acccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.status(201).json({ user, acccessToken });
};

exports.signin = async (req, res) => {};

exports.getMe = async (req, res) => {};
