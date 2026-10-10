const validator = require("fastest-validator")
const { default: mongoose } = require("mongoose")
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
        type: "number",
        required: true
    },
    category: {
        type: "string",
        required: true
    },

    price: {
        type: "number",
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
    },
    $$strict: true

}


const check = v.compile(schema)
module.exports = check