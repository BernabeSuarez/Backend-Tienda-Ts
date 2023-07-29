import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/routes";
import { connectDB } from "./src/config/database";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log("Server Run...");
});
