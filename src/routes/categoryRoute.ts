import express, { Router } from "express";
import AuthMiddleware, { Role } from "../middleware/authMiddleware";
import errorHandler from "../services/errorHandler";
import categoryController from "../controllers/categoryController";

const router: Router = express.Router();

router
  .route("/")
  .post(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restictto(Role.Admin),
    errorHandler(categoryController.AddCategory)
  );

router.route("/").get(errorHandler(categoryController.getAllCategory));
router
  .route("/:id")
  .delete(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restictto(Role.Admin),
    errorHandler(categoryController.deleteCategory)
  );
router
  .route("/:id")
  .patch(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restictto(Role.Admin),
    errorHandler(categoryController.updateCategory)
  );

export default router;
