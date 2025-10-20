import { Router } from "express";
import { MovimientosController } from "../controllers/movimientos.controller";

const router = Router();

//registrar movimiento
router.post("/entrada-materia", MovimientosController.registrarEntradaMateria);
router.post("/actualizacion-materia", MovimientosController.actualizacionMateria);
router.post("/eliminacion-materia", MovimientosController.eliminacionMateria);
router.post("/registro-producto", MovimientosController.registrarProductoTerm);
router.post("/salida-producto", MovimientosController.registrarSalidaProductoTerm);
router.post("/actualizacion-producto", MovimientosController.actualizacionProducto);
router.post("/eliminacion-producto", MovimientosController.eliminacionProducto);
router.get("/", MovimientosController.movimientos);

export default router;