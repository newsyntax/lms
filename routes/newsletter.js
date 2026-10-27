const express = require("express");
const router = express.Router();
const authMiddleware = require("./../middlewares/auth");
const isAdminMiddleware = require("./../middlewares/isAdmin");
const controller = require("../controllers/newsletter");

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, controller.getAll)
  .post(controller.create);

module.exports = router;
