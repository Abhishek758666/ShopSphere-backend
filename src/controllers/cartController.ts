import Cart from "../database/models/cartModel";
import { UserRequestType } from "../middleware/authMiddleware";
import { Response } from "express";

class CartController {
  async addtoCart(req: UserRequestType, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { quantity, productId } = req.body;

    if (!quantity || !productId) {
      res.status(400).json({ message: "please provide product and quantity" });
    }

    let cartItem = await Cart.findOne({
      where: {
        productId,
        userId,
      },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      const cartItem = Cart.create({
        userId,
        productId,
        quantity,
      });
    }

    res.status(200).json({
      message: "cart added successfully",
      data: cartItem,
    });
  }
}

export default new CartController();
