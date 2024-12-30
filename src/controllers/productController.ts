import { Request, Response } from "express";
import Product from "../database/models/productModel";
import { UserRequestType } from "../middleware/authMiddleware";
import Category from "../database/models/categoryModel";
import User from "../database/models/userModel";

declare global {
  namespace Express {
    interface Request {
      file?: {
        filename: string;
      };
    }
  }
}

class ProductController {
  public static async addProduct(
    req: UserRequestType,
    res: Response
  ): Promise<void> {
    const fileName = req?.file?.filename;
    const {
      productName,
      productDescription,
      productPrice,
      productStock,
      categoryId,
    } = req.body;

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productStock ||
      !categoryId
    ) {
      res.status(400).json({
        message: "please provide all the fields",
      });
      return;
    }

    const [categoryExist] = await Category.findAll({
      where: {
        id: categoryId,
      },
    });
    if (categoryExist) {
      await Product.create({
        productName,
        productPrice,
        productDescription,
        productStock,
        productImage: fileName ?? "notfound.jpg",
        userId: req?.user?.id,
        categoryId: categoryId,
      });

      res.status(200).json({
        message: "product created",
      });
    } else {
      res.status(404).json({
        message: "category not found",
      });
    }
  }

  public static async getAllProducts(
    req: Request,
    res: Response
  ): Promise<void> {
    const data = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Category,
          attributes: ["id", "categoryName"],
        },
      ],
    });

    res.status(200).json({
      message: "successfully fetched data",
      data,
    });
  }

  public static async getSingleProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;

    const data = await Product.findAll({
      where: {
        id: id,
      },
    });

    if (data.length === 0 || !data) {
      res.status(404).json({
        message: "product not found",
      });
      return;
    }
    res.status(200).json({
      message: "product fetched successfully",
      data,
    });
  }

  public static async deleteProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const data = await Product.findAll({
      where: {
        id: id,
      },
    });

    if (data.length === 0 || !data) {
      res.status(404).json({
        message: "product not found",
      });
      return;
    }

    Product.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "product deleted successfully",
    });
  }
}

export default ProductController;
