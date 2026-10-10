const validator = require("fastest-validator")
const mongoose = require("mongoose")
const v = new validator()

const schema = {
    name: {
        type: "string",
        required: true
    },
    description: {
        type: "string",
        required: true
    },
    support: {
        type: "string",
        required: true

    },
    discount: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    status: {
        type: "string",
        required: true
    },
    href: {
        type: "string",
        required: true
    },
    cover: {
        type: "string",
        required: true
    }

}


const check = v.compile(schema)
module.exports = check