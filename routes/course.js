const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const controller = require("../controllers/course")
const multerStorage = require("../utils/uploader")
const multer = require("multer")

router
    .route("/")
    .post(authMiddleware, isAdmin, multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single("cover"), controller.create)
    .get(controller.getAll)

router
    .route("/:id/session")
    .post(authMiddleware, isAdmin, multer({ storage: multerStorage, limits: { fileSize: 1000000000 } },).single("video"), controller.createSession)


router.route("/sessions").get(authMiddleware, isAdmin, controller.getAllSessions)
router.route("/:href/:sessionID").get(controller.getOneSessionInfo)

router.route("/session/:id").delete(authMiddleware, isAdmin, controller.removeOneSession)

router.route("/:id/register").post(authMiddleware, controller.registerOneStudent)
module.exports = router