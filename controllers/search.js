const courseModel = require("../models/course");

exports.get = async (req, res) => {
  const { keyword } = req.params;
  const courses = await courseModel.find({
    name: { $regex: ".*" + keyword + "*." },
  });

  if (!courses) {
    return res.json({ message: "no such course" });
  }

  return res.json(courses);
};
