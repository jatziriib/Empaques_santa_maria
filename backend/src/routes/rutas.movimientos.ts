import { Router } from "express";
import { MovimientosController } from "../controllers/movimientos.controller";

const router = Router();

//Registrar un movimiento
router.post("/registrar", MovimientosController.registrar);
router.get("/", MovimientosController.movimientos);

export default router;