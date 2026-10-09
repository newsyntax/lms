const express = require("express")
const controller = require("../controllers/category")
const authMiddleware = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const router = express.Router()


router
    .route("/")
    .get(controller.getAll)
    .post(authMiddleware, isAdmin, controller.createCategory)


router
    .route("/:id")
    .put(authMiddleware, isAdmin, controller.updateCategory)
    .delete(authMiddleware, isAdmin, controller.removeCategory)



module.exports = router