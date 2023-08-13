import { Request, Response, NextFunction } from "express";

const re: RegExp = /\S+@\S+\.\S+/;

export function createUserValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, password } = req.body;
  if (name.trim().length < 1) {
    res.status(404).json({
      message: "El campo nombre no puede estar vacio",
    });
  }
  if (password.length < 8) {
    res.status(404).json({
      message: "la contraseña debe tener un minimo de 8 caracteres",
    });
  }
  if (!re.test(email)) {
    res.status(404).json({
      message: "El formato de email no es valido",
    });
  }
  next();
}

export function loginUserValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  if (password.length < 8) {
    res.status(404).json({
      message: "la contraseña debe tener un minimo de 8 caracteres",
    });
  }
  if (!re.test(email)) {
    res.status(404).json({
      message: "El formato de email no es valido",
    });
  }
  next();
}
