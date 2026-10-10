const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const controller = require("../controllers/course")
const multerStorage = require("../utils/uploader")
const multer = require("multer")

router.route("/").post(authMiddleware, isAdmin, multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single("cover"), controller.create)
    .get(controller.getAll)

module.exports = router