import express, { Router } from "express";
import AuthMiddleware, { Role } from "../middleware/authMiddleware";
import errorHandler from "../services/errorHandler";
import OrderController from "../controllers/orderController";

const router: Router = express.Router();

router
  .route("/")
  .post(
    AuthMiddleware.isAuthenticated,
    errorHandler(OrderController.createOrder)
  );
router
  .route("/verify")
  .post(
    AuthMiddleware.isAuthenticated,
    errorHandler(OrderController.verifyTransaction)
  );
router
  .route("/customer")
  .get(
    AuthMiddleware.isAuthenticated,
    errorHandler(OrderController.fetchMyorders)
  );
router
  .route("/customer/order-details/:id")
  .get(
    AuthMiddleware.isAuthenticated,
    errorHandler(OrderController.fetchOrderDetails)
  );
router
  .route("/customer/cancel/:id")
  .patch(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restictto(Role.Customer),
    errorHandler(OrderController.cancelOrder)
  );

export default router;
