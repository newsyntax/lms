const courseModel = require("../models/course")
const validator = require("../validators/course")


exports.create = async (req, res) => {
    const isValidInfo = validator(req.body)
    if (!isValidInfo) {
        return res.status(422).json({ isValidInfo })
    }
    const { name,
        description,
        support,
        discount,
        category,
        price,
        status,
        href,
    } = req.body
    const course = await courseModel.create({
        name,
        description,
        support,
        discount,
        category,
        creator: req.user._id,
        price,
        status,
        href,
        cover: req.file.filename

    })

    if (!course) {
        return res.status(403).json({ message: "course do not created, there's a problem" })
    }

    return res.json({ course })
}

exports.getAll = async (req, res) => {
    const courses = await courseModel.find({})
        .populate("category")
        .populate("creator", "-password -email -phone -role -username -createdAt -updatedAt -__v")
    return res.json(courses)
}