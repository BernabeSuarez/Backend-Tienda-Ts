import { Router } from "express";
import {
  createUser,
  loginUser,
  getUsers,
} from "../controllers/user.controller";

const router = Router();

router.get("/", (req, res) => {
  res.send("Server working OK!");
});

//User Routes
router.post("/signup", createUser);
router.post("/signin", loginUser);
router.get("/users", getUsers);
// router.get('/checktoken', verifyToken)

export default router;
