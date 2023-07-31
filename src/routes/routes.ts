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

const router = Router();

router.get("/", rootController);

//User Routes
router.post("/api/signup", createUser);
router.post("/api/signin", loginUser);
router.get("/api/users", getUsers);
// router.get('/api/checktoken', verifyToken)

// Products Routes
router.post("/api/product", multer.single("image"), addProduct); //multer middleware permite aceptar imagenes
router.get("/api/products", getProducts);
router.put("/api/product/:id", updateProducts);
router.delete("/api/product/:id", deleteProducts);

// Orders Routes

export default router;
