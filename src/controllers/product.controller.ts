import { Request, Response } from "express";
import Product from "../models/Product";
import { uploadImage } from "../config/cloudinary";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, section, description, price } = req.body;

    //console.log(req.file);
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

export const updateProducts = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateProduct = await Product.findByIdAndUpdate(id, {
      $set: req.body,
    });
    if (!updateProduct) {
      return res.status(404).json({ message: "El producto no existe" });
    }
    res.status(200).json({ message: "El producto ha sido actualizado" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(404).json({ message: "El producto no existe" });
    }
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {}
};
