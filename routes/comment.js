const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const controller = require("../controllers/comment");

router.route("/").post(authMiddleware, controller.createCommnet);
router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, controller.removeComment);

router
  .route("/:id/accept")
  .put(authMiddleware, isAdminMiddleware, controller.acceptComment);
router
  .route("/:id/reject")
  .put(authMiddleware, isAdminMiddleware, controller.rejectComment);
module.exports = router;
