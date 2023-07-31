import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import router from "./src/routes/routes";
import { connectDB } from "./src/config/database";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

connectDB();

app.use(
  cors({
    origin: "https://tienda-online-nucba.onrender.com", //cambiar por direccion de la pagina
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
}); //soluciona el problema de cors

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log("Server Run...");
});
