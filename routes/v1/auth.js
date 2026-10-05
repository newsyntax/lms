const express = require("express");
const controller = require("../../controllers/v1/auth");
const router = express.Router();

router.route("/signup").post(controller.signup);
router.route("/signin").post(controller.signin);
router.route("/me").get(controller.getMe);

module.exports = router;
