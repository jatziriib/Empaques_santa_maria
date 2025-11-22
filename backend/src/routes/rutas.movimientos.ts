import { Router } from "express";
import { MovimientosController } from "../controllers/movimientos.controller";
import { verificarToken, verificarRol } from "../utils/verificarAuth";

const router = Router();

//rutas protegidas

//materia
router.post("/entrada-materia",
    verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.registrarEntradaMateria
);

router.post(
    "/desactivacion-materia/:id_materia_prima",
    verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.desactivacionMateria
);
router.post(
    "/devolucion-materia", verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.devolucionMateria
);

//productos
router.post(
    "/salida-producto", verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.registrarSalida
);
router.patch(
    "/actualizacion-producto/:id_producto_terminado",
    verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.actualizacionProducto
);
router.post(
    "/desactivacion-producto/:id_producto_terminado",
    verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.desactivacionProducto
);
router.post(
    "/devolucion-producto",
    verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.devolucionProducto
);
//ruta publica
router.get("/", MovimientosController.movimientos);

export default router;
