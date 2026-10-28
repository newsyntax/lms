const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const isAdminMiddlware = require("../middlewares/isAdmin");
const controller = require("../controllers/off");

router
  .route("/")
  .get(authMiddleware, isAdminMiddlware, controller.getAll)
  .post(authMiddleware, isAdminMiddlware, controller.create);

router
  .route("/all")
  .post(authMiddleware, isAdminMiddlware, controller.setOffOnAll);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddlware, controller.removeOne);

router.route("/:code").get(authMiddleware, controller.getOne);

module.exports = router;
