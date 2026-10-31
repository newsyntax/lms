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
  .route("/departments")
  .get(ticketController.departments)
  .post(authMiddleware, isAdminMiddleware, ticketController.createDepartment);

router
  .route("/departments/:id/subs")
  .get(ticketController.departmentSubs)
  .post(authMiddleware, isAdminMiddleware, ticketController.createSub);

router
  .route("/answer")
  .post(authMiddleware, isAdminMiddleware, ticketController.setAnswer);

router.route("/:id/answr").get(authMiddleware, ticketController.getAnswer);

module.exports = router;
