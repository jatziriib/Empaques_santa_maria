import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

//Todos pueden acceder
router.post("/registro", AuthController.registrar);
router.post("/login", AuthController.login);
router.post("/olvido-contrasena", AuthController.olvidoContrasena);
router.post("/verificar-codigo", AuthController.verificarOtp);
router.post("/restablecer-contrasena", AuthController.restablecerContrasena);

export default router;
