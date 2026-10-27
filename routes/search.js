const express = require("express");
const router = express.Router();
const controller = require("../controllers/search");

router.route("/:keyword").get(controller.get);

module.exports = router;
