const banUserModel = require("../../models/ban-user");
const userModel = require("../../models/user");

exports.banUser = async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });

  const isUserBanned = await userModel.findOne({ _id: req.params.id })
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
