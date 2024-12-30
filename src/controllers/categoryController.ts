import { Request, Response } from "express";
import Category from "../database/models/categoryModel";

class CategoryController {
  categoryData = [
    {
      categoryName: "Electronics",
    },
    {
      categoryName: "Groceries",
    },
    {
      categoryName: "Food/Beverages",
    },
    {
      categoryName: "Cothes",
    },
  ];

  async CategorySeeder(): Promise<void> {
    const [categoryData] = await Category.findAll();

    if (!categoryData) {
      const createdData = await Category.bulkCreate(this.categoryData);
      console.log("categories seeded successfully");
    } else {
      console.log("Already seeded");
    }
  }

  async AddCategory(req: Request, res: Response): Promise<void> {
    const { categoryName } = req.body;
    console.log(categoryName);

    if (!categoryName) {
      res.status(400).json({ message: "please provide category name" });
      return;
    }
    await Category.create({ categoryName });
    res.status(200).json({ message: "category added successfully" });
  }

  async getAllCategory(req: Request, res: Response): Promise<void> {
    const data = await Category.findAll();
    res.status(200).json({ message: "category fetched successfully", data });
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const [data] = await Category.findAll({
      where: {
        id: id,
      },
    });

    if (!data) {
      res.status(400).json({ message: "category not found" });
      return;
    }
    await Category.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "category deleted successfully" });
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const { categoryName } = req.body;

    await Category.update(
      { categoryName },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ message: "category updated successfully" });
  }
}

export default new CategoryController();
