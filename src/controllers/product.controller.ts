import { Request, Response } from "express";
import Product from "../models/Product";
import { uploadImage } from "../config/cloudinary";

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
      const result = await uploadImage(req.file.path);
      product.img = result.secure_url;
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
