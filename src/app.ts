import express from "express";
import "./database/connection";
import userRoute from "./routes/userRoute";
import adminSeeder from "./services/adminSeeder";
import productRoute from "./routes/productRoute";
import categoryController from "./controllers/categoryController";
import categoryRoute from "./routes/categoryRoute";
import cartRouter from "./routes/cartRoute";
import orderRouter from "./routes/orderRoute";
import bannerRouter from "./routes/bannerRoute";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

adminSeeder();
categoryController.CategorySeeder();

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/api/v1/", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/banner", bannerRouter);

app.get("/", (req, res) => {
  console.log(path.join(__dirname, "./uploads"));
  res.send("i am alive");
});

export default app;
