import { Schema, model } from "mongoose";
import { IOrder } from "../interfaces/IOrder";

const orderSchema = new Schema({
  user: { type: Object, required: true },
  cart: { type: Array, required: true },
  price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
