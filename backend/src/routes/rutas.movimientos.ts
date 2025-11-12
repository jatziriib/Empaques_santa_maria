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
    "/actualizacion-materia",
    verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.actualizacionMateria
);

router.post(
    "/desactivacion-materia",
    verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.desactivacionMateria
);

router.post(
    "/devolucion-materia", verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.devolucionMateria
);

//productos
router.post(
    "/registro-producto",
    verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.registrarProductoTerm
);

router.post(
    "/salida-producto", verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.registrarSalidaProductoTerm
);

router.post(
    "/actualizacion-producto",
    verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.actualizacionProducto
);

router.post(
    "/desactivacion-producto",
    verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.desactivacionProducto
);

router.post(
    "/devolucion-producto",
    verificarToken, verificarRol(["admin", "encargadotarimas"]), MovimientosController.devolucionProducto
);


//ruta publica
router.get("/", MovimientosController.movimientos);

export default router;
