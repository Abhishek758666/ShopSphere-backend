import { Sequelize } from "sequelize-typescript";
import User from "./models/userModel";
import Product from "./models/productModel";
import Category from "./models/categoryModel";
import { envConfig } from "../config/envConfig";
import Cart from "./models/cartModel";

const sequelize = new Sequelize({
  database: envConfig.DB_NAME,
  dialect: "mysql",
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  host: envConfig.DB_HOST,
  port: Number(envConfig.DB_PORT),
  models: [__dirname + "/models"],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

sequelize.sync({ force: false }).then(() => {
  console.log("synced !!!");
});

// Relationships

User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

Category.hasOne(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

Product.hasMany(Cart, { foreignKey: "productId" });
Cart.belongsTo(User, { foreignKey: "userId" });

export default sequelize;
