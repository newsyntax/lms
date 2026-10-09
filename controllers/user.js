const userModel = require("../models/user");
const banUserModel = require("../models/ban-user");

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