const expresss = require("express");
const router = expresss.Router();
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const controller = require("../controllers/contact");

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, controller.getAll)
  .post(controller.create);

router
  .route("/answer")
  .post(authMiddleware, isAdminMiddleware, controller.answer);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, controller.remove);

module.exports = router;
