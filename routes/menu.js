const express = require("express");
const router = express.Router();
const controller = require("../controllers/menu");
const authMiddleware = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router
  .route("/")
  .get(authMiddleware, isAdmin, controller.getAllInPanel)
  .get(controller.getAll)
  .post(authMiddleware, isAdmin, controller.create);

router.route("/:id").delete(authMiddleware, isAdmin, controller.remove);

module.exports = router;
