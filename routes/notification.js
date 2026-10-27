const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const isAdminMiddlware = require("../middlewares/isAdmin");
const controller = require("../controllers/notification");

router
  .route("/")
  .post(authMiddleware, isAdminMiddlware, controller.create)
  .get(authMiddleware, isAdminMiddlware, controller.getAll);

router
  .route("/:adminID")
  .get(authMiddleware, isAdminMiddlware, controller.getOne);

router
  .route("/:id/seen")
  .put(authMiddleware, isAdminMiddlware, controller.seen);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddlware, controller.remove);

module.exports = router;
