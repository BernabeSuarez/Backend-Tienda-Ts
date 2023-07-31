import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface IDecoded {
  id: string;
  iat: number;
  exp: number;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies;
  if (!token) {
    res.status(401).json({
      auth: false,
      message: "No Token Provided!",
    });
  }
  const decoded = jwt.verify(
    token,
    process.env.SECRET_KEY || "tokentest"
  ) as IDecoded;
  req.userId = decoded.id;
  res.status(200).json({ currentUser: req.userId });
  next();
}
