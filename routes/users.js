const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

router.route("/").get(authMiddleware, isAdminMiddleware, controller.getAllUsers)

router
  .route("/ban/:id")
  .post(authMiddleware, isAdminMiddleware, controller.banUser);

module.exports = router;
