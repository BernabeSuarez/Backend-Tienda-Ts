import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { IUser } from "../interfaces/IUser";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const checkMail = await User.findOne({ email: email });
    const user: IUser = new User({
      name: name,
      email: email,
      password: password,
    });
    if (checkMail?.email === user.email) {
      return res.status(404).send("El email Ya se encuentra registrado");
    }

    user.password = await user.encryptPass(user.password); //encripta la contraseña
    const saveUser = await user.save(); // guarda en la db mongoose

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || "", {
      expiresIn: 60 * 60 * 24,
    }); //crear un token unico por cada usuario, expiresIn determina cuando se vencera ese token
    res.status(200).json({ auth: true, token });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send("El email no existe");
  }
  const validPass = await user.validatePass(password);
  if (!validPass) {
    return res.status(401).send("Contraseña Incorrecta");
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || "", {
    expiresIn: 60 * 60 * 24, //tiempo que tiene validez el token
  });
  res.cookie("Token", token, { maxAge: 900000, secure: false });
  //almacena el token
  res.status(200).json({
    //devuelve el usuario
    id: user._id,
    name: user.name,
    email: user.email,
    token: token,
  });
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
  }
};
