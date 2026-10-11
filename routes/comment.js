const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth")
const controller = require("../controllers/comment")


router.route("/").post(authMiddleware, controller.createCommnet)

module.exports = router