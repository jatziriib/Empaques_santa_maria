import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const router = Router();

//Obtener todos los usuarios
router.get("/", UsuarioController.getAll);
//Obtener usuario x id
router.get("/:id_usuario", UsuarioController.getById);
//Crear un usuario
router.post("/", UsuarioController.create);
//Actualizar un usuario
router.put("/:id_usuario", UsuarioController.update);
//Eliminar un usuario
router.delete("/:id_usuario", UsuarioController.delete);

export default router;
