const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const isUserExists = require("../middlewares/isUserExists");

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, controller.getAllUsers)

router.route("/:id")
  .delete(authMiddleware, isAdminMiddleware, isUserExists, controller.removeUser)

router
  .route("/ban/:id")
  .post(authMiddleware, isAdminMiddleware, isUserExists, controller.banUser);

module.exports = router;
