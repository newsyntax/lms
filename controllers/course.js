const courseModel = require("../models/course")
const sessionModel = require("../models/session")
const validator = require("../validators/course")
const fs = require("fs")


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

    fs.mkdir(`./public/courses/${name}`, (err) => {
        if (err) {
            console.log(err)
        }
    })
    return res.json({ course })
}

exports.getAll = async (req, res) => {
    const courses = await courseModel.find({})
        .populate("category")
        .populate("creator", "-password -email -phone -role -username -createdAt -updatedAt -__v")
    return res.json(courses)
}

exports.createSession = async (req, res) => {
    const { id } = req.params
    const { title, time, free } = req.body
    const session = await sessionModel.create({
        course: id,
        title,
        time,
        free,
        video: req.file.filename

    })

    return res.status(201).json(session)
}

exports.getAllSessions = async (req, res) => {
    const sessions = await sessionModel.find({}).populate("course", "name -_id").lean()
    res.json(sessions)
}