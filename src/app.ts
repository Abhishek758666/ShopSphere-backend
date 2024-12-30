import express from "express";
import "./database/connection";
import userRoute from "./routes/userRoute";
import adminSeeder from "./services/adminSeeder";
import productRoute from "./routes/productRoute";
import categoryController from "./controllers/categoryController";
import categoryRoute from "./routes/categoryRoute";

const app = express();
app.use(express.json());

adminSeeder();
categoryController.CategorySeeder();

app.use("/api/v1/", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);

app.get("/", (req, res) => {
  res.send("i am alive");
});

export default app;
