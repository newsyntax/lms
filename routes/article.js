const exppress = require("express");
const router = exppress.Router();
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const multer = require("multer");
const multerStorage = require("../utils/uploader");
const controller = require("../controllers/article");

router
  .route("/")
  .get(controller.getAll)
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "article-cover",
    ),
    controller.create,
  );

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, controller.removeOne);

router
  .route("/:id/draft")
  .put(authMiddleware, isAdminMiddleware, controller.saveDraft);
router.route("/:href").get(authMiddleware, controller.getOne);

module.exports = router;
