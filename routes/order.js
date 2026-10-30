const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const isAdminMiddlware = require("../middlewares/isAdmin");
const controller = require("../controllers/order");

router.route("/").get(authMiddleware, controller.getAll);
router.route("/:id").get(authMiddleware, controller.getOne);

module.exports = router;
