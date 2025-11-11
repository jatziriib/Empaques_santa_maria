import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function verificarToken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) return res.status(401).json({ mensaje: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretoo");
    (req as any).usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: "Token no valido o ya expiro" });
  }
}

export function verificarRol(rolesPermitidos: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const usuario = (req as any).usuario;

    if (!usuario) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    if (!rolesPermitidos.includes(usuario.rol)) {
      return res.status(403).json({ mensaje: "No tienes permisos para acceder a esta ruta" });
    }

    next();
  };
}
