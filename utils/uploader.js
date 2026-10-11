const multer = require("multer")
const path = require("path")
const crypto = require("crypto")
module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "courses", "covers"))
    },
    filename: (req, file, cb) => {
        const filename = crypto.createHash("SHA256").update(file.originalname).digest("hex")
        const extention = path.extname(file.originalname)
        cb(null, filename + extention)
    }
})