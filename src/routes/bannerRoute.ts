import express, { Router } from "express";
import AuthMiddleware, { Role } from "../middleware/authMiddleware";
import errorHandler from "../services/errorHandler";
import BannerController from "../controllers/bannercontroller";
import { storage, multer } from "../middleware/multerMiddleware";

const upload = multer({ storage });
const router: Router = express.Router();

router
  .route("/")
  .post(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restictto(Role.Admin),
    upload.single("bannerImage"),
    errorHandler(BannerController.addBanner)
  );
router.route("/").get(errorHandler(BannerController.getBanner));
router
  .route("/:id")
  .patch(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restictto(Role.Admin),
    upload.single("bannerImage"),
    errorHandler(BannerController.updateBanner)
  );
router
  .route("/:id")
  .delete(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restictto(Role.Admin),
    errorHandler(BannerController.deleteBanner)
  );

export default router;
