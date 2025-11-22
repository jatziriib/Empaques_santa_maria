import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { CrearUsuarioDto } from "../dtos/create.usuario.dto";
import { ActualizarUsuarioDto } from "../dtos/update.usuario.dto";
import { UsuarioServicio } from "../services/usuario.servicio";

const usuarioServicio = new UsuarioServicio();
export class UsuarioController {
  //Obtener todos los usuarios
  static async getAll(req: Request, res: Response) {
    try {
      const usuarios = await usuarioServicio.getAll();
      res.json(usuarios);
    }
    catch (err) {
      res.status(500).json({ message: "Error al obtenerer usuarios", error: err });

    }
  }
  //Obtener usuario x id
  static async getById(req: Request, res: Response) {
    const id_usuario = Number(req.params.id_usuario);
    if (isNaN(id_usuario)) return res.status(400).json({ message: "id inválido" });

    try {
      const usuario = await usuarioServicio.getById(id_usuario);
      if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ message: "Error al obtener el usuario", error: err });
    }
  }

  //crear usuario
  static async create(req: Request, res: Response) {
    const dto = plainToClass(CrearUsuarioDto, req.body);
    const errores = await validate(dto);

    if (errores.length > 0) {
      return res.status(400).json(errores);
    }

    try {
      const nuevoUsuario = await usuarioServicio.create(dto);
      res.status(201).json(nuevoUsuario);
    } catch (err) {
      res.status(500).json({ message: "Error al crear usuario", error: err });
    }
  }
  //Actualizar usuario
  static async update(req: Request, res: Response) {
    const id_usuario = Number(req.params.id_usuario);
    const dto = plainToClass(ActualizarUsuarioDto, req.body);
    const errores = await validate(dto);

    if (errores.length > 0) {
      return res.status(400).json(errores);
    }

    try {
      const updateUsuario = await usuarioServicio.update(id_usuario, dto);
      if (!updateUsuario) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json(updateUsuario);
    } catch (err) {
      res.status(500).json({ message: "Error al actualizar usuario", error: err });
    }
  }

  //eliminar usuario
  static async delete(req: Request, res: Response) {
    const id_usuario = Number(req.params.id_usuario);
    try {
      const exitoso = await usuarioServicio.delete(id_usuario);
      if (!exitoso) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json({ message: "Usuario eliminado" });
    } catch (err) {
      res.status(500).json({ message: "Error al eliminar el usuario", error: err });
    }
  }
}
