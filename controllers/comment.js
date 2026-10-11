const commentModel = require("../models/comment")
const courseModel = require("../models/course")

exports.createCommnet = async (req, res) => {
    const { courseHref, body, score } = req.body
    const course = await courseModel.findOne({ href: courseHref })

    if (!course) {
        return res.status(409).json({ message: "no such course" })
    }

    const comment = await commentModel.create({
        body,
        course: course._id,
        score,
        creator: req.user._id,
        isAnswer: 0,
        isAccept: 0


    })


    res.status(201).json(comment)

}