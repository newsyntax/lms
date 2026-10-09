const userModel = require("../models/user");
const banUserModel = require("../models/ban-user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("../validators/register");

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

  const isUserBanned = await banUserModel.findOne({
    $or: [{ phone }, { email }, { username }],
  });

  if (isUserBanned) {
    return res.status(422).json({ message: "user have been banned" });
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

exports.signin = async (req, res) => {
  const { identifier, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user) {
    return res.status(401).json({ message: "user not exists" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(422).json({ message: "invalid password" });
  }

  const acccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.status(200).json({ acccessToken });
};

exports.getMe = async (req, res) => {};
