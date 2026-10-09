const { isValidObjectId } = require("mongoose")
const categoryModel = require("../models/category")

exports.getAll = async (req, res) => {
    const categories = await categoryModel.find({})
    res.json(categories)

}

exports.createCategory = async (req, res) => {
    const { title, href } = req.body
    const category = await categoryModel.create({ title, href })
    res.json(category)

}

exports.updateCategory = async (req, res) => {
    const { id } = req.params
    const isValidID = isValidObjectId(id)


    if (!isValidID) {
        return res.status(409).json({ message: "invalid id" })

    }
    const { title, href } = req.body
    const category = await categoryModel.findOneAndUpdate({ _id: id }, { title, href })
    if (!category) {
        return res.status(422).json({ message: "category not found" })
    }
    res.json({ message: "category updated successfully" })

}

exports.removeCategory = async (req, res) => {
    const { id } = req.params
    const isValidID = isValidObjectId(id)


    if (!isValidID) {
        return res.status(409).json({ message: "invalid id" })

    }
    const category = await categoryModel.findOneAndDelete({ _id: id })
    if (!category) {
        return res.status(422).json({ message: "category not found" })


    }
    res.json({ message: "category removed successfully" })

}