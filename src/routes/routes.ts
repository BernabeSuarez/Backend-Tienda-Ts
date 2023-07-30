import { Router } from "express";
import {
  createUser,
  loginUser,
  getUsers,
} from "../controllers/user.controller";
import { addProduct, getProducts } from "../controllers/product.controller";
import multer from "../../libs/multer";

const router = Router();

router.get("/api", (req, res) => {
  res.send("Server working OK!");
});

//User Routes
router.post("/api/signup", createUser);
router.post("/api/signin", loginUser);
router.get("/api/users", getUsers);
// router.get('/api/checktoken', verifyToken)

// Products Routes
router.post("/api/product", multer.single("image"), addProduct); //multer middleware permite aceptar imagenes
router.get("/api/products", getProducts);

export default router;
