const { isValidObjectId } = require("mongoose")
const usersModel = require("../models/user")

module.exports = async (req, res, next) => {
    console.log("is user exist middleware")
    const { id } = req.params
    const isValidID = isValidObjectId(id)

    if (!isValidID) {
        return res.status(409).json({ message: "invalid ID" })

    }

    const isUserExists = await usersModel.findOne({ _id: id })
    if (!isUserExists) {
        return res.status(403).json({ message: "no such user" })


    }
    return next();


}