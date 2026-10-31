const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const ticketController = require("../controllers/ticket");

router
  .route("/")
  .post(authMiddleware, ticketController.create)
  .get(authMiddleware, isAdminMiddleware, ticketController.getAll);

router.route("/user").get(authMiddleware, ticketController.userTickets);

router
  .route("/department")
  .get(authMiddleware, isAdminMiddleware, ticketController.departments);

router
  .route("/:departmentID/subs-department")
  .get(authMiddleware, isAdminMiddleware, ticketController.departmentSubs);

router
  .route("/answer")
  .post(authMiddleware, isAdminMiddleware, ticketController.setAnswer);

router.route("/:id/answr").get(authMiddleware, ticketController.getAnswer);

module.exports = router;
