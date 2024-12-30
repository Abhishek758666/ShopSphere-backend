import express, { Router } from "express";
import AuthMiddleware, { Role } from "../middleware/authMiddleware";
import ProductController from "../controllers/productController";
import { storage, multer } from "../middleware/multerMiddleware";
import errorHandler from "../services/errorHandler";

const upload = multer({ storage });
const router: Router = express.Router();

router
  .route("/")
  .post(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restictto(Role.Admin),
    upload.single("productImage"),
    errorHandler(ProductController.addProduct)
  );

router.route("/").get(errorHandler(ProductController.getAllProducts));
router.route("/:id").get(errorHandler(ProductController.getSingleProduct));
router
  .route("/:id")
  .delete(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restictto(Role.Admin),
    errorHandler(ProductController.deleteProduct)
  );

export default router;
