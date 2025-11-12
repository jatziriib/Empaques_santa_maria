import { Request, Response } from "express";
import { AuthServicio } from "../services/auth.servicio";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { DtoRegistro } from "../dtos/registros.dto";
import { LoginDto } from "../dtos/login.dto";
import { OlvidoContrasenaDto } from "../dtos/olvido.contrasena.dto";
import { RestablecerContrasenaDto } from "../dtos/restablecer.contrasena.dto";
import { VerificarOtpDto } from "../dtos/verificar.otp.dto";

const authServicio = new AuthServicio();

export class AuthController {
  //registro
  static async registrar(req: Request, res: Response) {
    const dto = plainToClass(DtoRegistro, req.body);
    const errores = await validate(dto);

    if (errores.length > 0) return res.status(400).json(errores);

    try {
      const usuario = await authServicio.registrar(dto);
      res.status(201).json(usuario);
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  //login
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

  //olvido de contrasena
  static async olvidoContrasena(req: Request, res:Response){
    const dto = plainToClass(OlvidoContrasenaDto, req.body);
    const errores = await validate(dto);
    if(errores.length > 0) return res.status(400).json(errores)

    try{
      await authServicio.enviarOtp(dto.correo);
      res.json({message: "Codigo enviado al correo"});
    }catch(err){
      res.status(400).json({message: (err as Error).message});
    }
  }

  //verificar otp
  static async verificarOtp(req:Request, res:Response){
    const dto = plainToClass(VerificarOtpDto, req.body);
    const errores = await validate(dto);
    if(errores.length > 0) return res.status(400).json(errores)

    try{
      const valido = await authServicio.verificarOtp(dto.correo, dto.otp);
      if(!valido) return res.status(400).json({message: "Codigo no valido o ya expiro"});
      res.json({message: "codigo verificado, ya puedes restablecer la contrasena"});
    }catch(err){
      res.status(400).json({message: (err as Error).message});
    }
  }

  //restablecer contrasena
  static async restablecerContrasena(req:Request, res:Response){
    const dto = plainToClass(RestablecerContrasenaDto, req.body);
    const errores = await validate(dto);
    if (errores.length > 0) return res.status(400).json(errores);

    try {
      await authServicio.restablecerContrasena(dto.correo, dto.nueva_contrasena);
      res.json({ message: "contrasena restablecida bien" });
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

}
