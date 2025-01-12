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

export default router;
