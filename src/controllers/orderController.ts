import { UserRequestType } from "../middleware/authMiddleware";
import { Response } from "express";
import {
  khaltiLookupResponse,
  khaltiResponse,
  OrderData,
  PaymentMethod,
  TransactionStatus,
} from "../types/orderTypes";
import Order from "../database/models/orderModel";
import Payment from "../database/models/paymentModel";
import OrderDetail from "../database/models/orderDetailModel";
import axios from "axios";
import { envConfig } from "../config/envConfig";
import Product from "../database/models/productModel";

class OrderController {
  async createOrder(req: UserRequestType, res: Response): Promise<void> {
    const userId = req.user?.id;
    const {
      phoneNumber,
      shippingAddress,
      totalAmount,
      paymentDetails,
      items,
    }: OrderData = req.body;

    if (
      !phoneNumber ||
      !shippingAddress ||
      !totalAmount ||
      !paymentDetails.paymentMethod ||
      items.length === 0
    ) {
      res.status(400).json({
        message: "please provide all the data",
      });
      return;
    }

    const OrderData = await Order.create({
      phoneNumber,
      shippingAddress,
      totalAmount,
      userId,
    });

    const paymentData = await Payment.create({
      paymentMethod: paymentDetails.paymentMethod,
    });

    for (let index = 0; index < items.length; index++) {
      await OrderDetail.create({
        quantity: items[index].quantity,
        productId: items[0].productId,
        orderId: OrderData.id,
      });
    }

    if (paymentDetails.paymentMethod === PaymentMethod.Khalti) {
      const data = {
        return_url: "http://localhost:3000",
        purchase_order_id: OrderData.id,
        amount: totalAmount * 100,
        website_url: "http://localhost:3000",
        purchase_order_name: "orderName_" + OrderData.id,
      };

      const response = await axios.post(
        "https://dev.khalti.com/api/v2/epayment/initiate/",
        data,
        {
          headers: {
            Authorization: `key ${envConfig.KHALTI_TOKEN}`,
          },
        }
      );
      const khaltiResponse: khaltiResponse = response.data;
      paymentData.pidx = khaltiResponse.pidx;
      paymentData.save();
      res.status(200).json({
        message: "ordered placed successfully",
        url: khaltiResponse.payment_url,
      });
    } else {
      res.status(200).json({
        message: "ordered placed successfully",
      });
    }
  }

  async verifyTransaction(req: UserRequestType, res: Response): Promise<void> {
    const { pidx } = req.body;
    if (!pidx) {
      res.status(400).json({
        message: "invalid request",
      });
      return;
    }

    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `key ${envConfig.KHALTI_TOKEN}`,
        },
      }
    );

    const data: khaltiLookupResponse = response.data;

    if (data.status === TransactionStatus.Completed) {
      await Payment.update(
        { paymentStatus: "paid" },
        {
          where: {
            pidx: pidx,
          },
        }
      );

      res.status(200).json({
        message: "payment ssuccess",
      });
    } else {
      res.status(400).json({
        message: "payment failed",
      });
      return;
    }
  }

  async fetchMyorders(req: UserRequestType, res: Response): Promise<void> {
    const userId = req.user?.id;

    const orders = await Order.findAll({
      where: {
        userId: userId,
      },
    });

    if (orders.length > 0) {
      res.status(200).json({
        message: "order fetched successfully",
        data: orders,
      });
    } else {
      res.status(400).json({
        message: "you haven't ordered anything",
      });
    }
  }

  async fetchOrderDetails(req: UserRequestType, res: Response) {
    const orderId = req.params.id;

    const order = await Order.findAll({
      where: {
        orderId,
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    if (order.length > 0) {
      res.status(200).json({
        message: "order fetched successfully",
        data: order,
      });
    } else {
      res.status(200).json({
        message: "no order found",
      });
    }
  }

  async cancelOrder(req: UserRequestType, res: Response) {
    const userId = req.user?.id;
    const orderId = req.params.id;

    const order = Order.findAll({
      where: {
        userId,
        id: userId,
      },
    });
  }
}

export default new OrderController();
