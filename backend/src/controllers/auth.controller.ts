import { Request, Response } from "express";
import { AuthServicio } from "../services/auth.servicio";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { RegistroDto } from "../dtos/registro.dto";
import { LoginDto } from "../dtos/login.dto";

const authServicio = new AuthServicio();

export class AuthController {
  static async registrar(req: Request, res: Response) {
    const dto = plainToClass(RegistroDto, req.body);
    const errores = await validate(dto);

    if (errores.length > 0) return res.status(400).json(errores);

    try {
      const usuario = await authServicio.registrar(dto);
      res.status(201).json(usuario);
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  static async login(req: Request, res: Response) {
    const dto = plainToClass(LoginDto, req.body);
    const errores = await validate(dto);

    if (errores.length > 0) return res.status(400).json(errores);

    try {
      const result = await authServicio.login(dto);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}
