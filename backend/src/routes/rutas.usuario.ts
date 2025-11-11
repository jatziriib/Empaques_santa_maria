import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { verificarRol, verificarToken } from "../utils/verificarAuth";

const router = Router();

//todas las rutas son protegidas solo el admin puede acceder
//Obtener todos los usuarios
router.get("/", verificarToken, verificarRol(["admin"]),UsuarioController.getAll);
//Obtener usuario x id
router.get("/:id_usuario", verificarToken, verificarRol(["admin"]),UsuarioController.getById);
//Crear un usuario
router.post("/", verificarToken, verificarRol(["admin"]),UsuarioController.create);
//Actualizar un usuario
router.put("/:id_usuario", verificarToken, verificarRol(["admin"]),UsuarioController.update);
//Eliminar un usuario
router.delete("/:id_usuario", verificarToken, verificarRol(["admin"]),UsuarioController.delete);

export default router;
