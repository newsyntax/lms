const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    support: {
        type: String,
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
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },




},
    { timestamps: true }
)

schema.virtual("sessions", {
    ref: "Session",
    localFeild: "_id",
    foriegnField: "course"
})


schema.virtual("comments", {
    ref: "Comment",
    localFeild: "_id",
    foriegnField: "course"
})



const model = mongoose.model("Course", schema)

module.exports = model