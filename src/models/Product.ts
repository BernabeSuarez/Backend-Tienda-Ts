import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  img: String,
  section: String,
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
