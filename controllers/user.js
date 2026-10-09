const userModel = require("../models/user");
const banUserModel = require("../models/ban-user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

exports.banUser = async (req, res) => {
  const { id } = req.params
  const user = await userModel.findOne({ _id: id });


  const isUserBanned = await banUserModel.findOne({
    $or: [{ username: user.username }, { email: user.email }, { phone: user.phone }]
  })
  if (isUserBanned) {
    return res.status(422).json({ message: "user banned before" })

  }


  const banUser = await banUserModel.create({
    email: user.email,
    username: user.username,
    phone: user.phone,
  });
  if (banUser) {
    return res.status(201).json({ message: "user banned" });
  }
  return res.status(500).json({ message: "server error" });
};


exports.getAllUsers = async (req, res) => {
  const users = await userModel.find({}).select("-password")
  return res.json(users)
}

exports.removeUser = async (req, res) => {
  const { id } = req.params
  await userModel.deleteOne({ _id: id })
  res.status(200).json({ message: "user remove successfully" })
}

exports.editUserRole = async (req, res) => {
  const { id } = req.params
  await userModel.updateOne({ _id: id }, { $set: { role: req.body.role } })
  res.json({ message: `user role changed to ${req.body.role}` })

}

exports.updateUser = async (req, res) => {
  const { name, username, email, phone, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const token = req.header("Authorization").split(" ")[1]
  const payload = jwt.verify(token, process.env.JWT_SECRET)
  const userID = req.params.id
  //only user with its token and its own id can update its own information
  if (payload.id === userID) {

    await userModel.updateOne({ _id: req.user._id }, { name, username, email, phone, password: hashedPassword })
    res.json({ message: "user infos updated successfully" })
  }
  return res.status(403).json({ message: "invalid info" })
}