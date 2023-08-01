import Order from "../models/order";
import { Request, Response } from "express";

export const addOrder = async (req: Request, res: Response) => {
  try {
    const { user, cart, price } = req.body;
    const order = new Order({
      user,
      cart,
      price,
    });

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const allOrders = await Order.find();
    res.status(200).json(allOrders);
  } catch (error) {
    console.log(error);
  }
};
