import { Request, Response } from "express";
import Product from "../models/Product";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, section, description, price } = req.body;

    console.log(req.file);
    const product = new Product({
      name,
      section,
      description,
      price,
    });
    if (req.file) {
      product.img = req.file.path;
    }
    await product.save();

    return res.status(200).json({ message: "Product Load OK" });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    console.log(error);
  }
};
