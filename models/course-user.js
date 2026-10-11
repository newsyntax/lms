const mongoose = require("mongoose")

const schema = mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Course"

    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

const model = mongoose.model("CourseUser", schema)

module.exports = model