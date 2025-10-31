import { Router } from "express";
import { MovimientosController } from "../controllers/movimientos.controller";

const router = Router();

//materia
router.post("/entrada-materia", MovimientosController.registrarEntradaMateria);
router.post("/actualizacion-materia", MovimientosController.actualizacionMateria);
router.post("/desactivacion-materia", MovimientosController.desactivacionMateria);

//productos
router.post("/registro-producto", MovimientosController.registrarProductoTerm);
router.post("/salida-producto", MovimientosController.registrarSalidaProductoTerm);
router.post("/actualizacion-producto", MovimientosController.actualizacionProducto);
router.post("/desactivacion-producto", MovimientosController.desactivacionProducto);

//todos los mov
router.get("/", MovimientosController.movimientos);

export default router;
