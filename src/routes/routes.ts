import { Router, Request, Response } from "express";
import {
  createUser,
  loginUser,
  getUsers,
} from "../controllers/user.controller";
import {
  addProduct,
  deleteProducts,
  getProducts,
  updateProducts,
} from "../controllers/product.controller";
import multer from "../../libs/multer";
import { rootController } from "../controllers/root.controller";
import { payOrder } from "../controllers/payment.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { addOrder, getOrders } from "../controllers/orders.controller";
import {
  createUserValidation,
  loginUserValidation,
} from "../middlewares/userValidator";

const router = Router();

router.get("/", rootController);

//User Routes
router.post("/api/signup", createUserValidation, createUser);
router.post("/api/signin", loginUserValidation, loginUser);
router.get("/api/users", getUsers);
router.get("/api/checktoken", verifyToken, (req, res) => {
  res.send("Hello");
});

// Products Routes
router.post("/api/product", multer.single("image"), addProduct); //multer middleware permite aceptar imagenes
router.get("/api/products", getProducts);
router.put("/api/product/:id", updateProducts);
router.delete("/api/product/:id", deleteProducts);

// Orders Routes
router.post("/api/order", addOrder);
router.get("/api/orders", getOrders);

// Payment Routes
router.post("/api/payment", payOrder);
export default router;
