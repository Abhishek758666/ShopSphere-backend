import express, { Router } from "express";
import AuthMiddleware, { Role } from "../middleware/authMiddleware";
import errorHandler from "../services/errorHandler";
import cartController from "../controllers/cartController";

const router: Router = express.Router();

router
  .route("/")
  .post(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restictto(Role.Admin),
    errorHandler(cartController.addToCart)
  );

export default router;
