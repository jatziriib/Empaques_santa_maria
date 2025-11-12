import { Router } from "express";
import { ProductoTerminadoController } from "../controllers/productos.controller";
import { verificarRol, verificarToken } from "../utils/verificarAuth";
const router = Router();

//rutas publicas
//get productos
router.get("/", ProductoTerminadoController.getAll);
//get x id
router.get("/:id_producto_terminado", ProductoTerminadoController.getById);

//rutas protegidas
//post producto
router.post("/", verificarToken, verificarRol(["admin", "encargadotarimas"]),ProductoTerminadoController.create);
//update producto
router.put("/:id_producto_terminado", verificarToken, verificarRol(["admin", "encargadotarimas"]),ProductoTerminadoController.update);
//desactivar producto
router.put("/:id_producto_terminado", verificarToken, verificarRol(["admin", "encargadotarimas"]),ProductoTerminadoController.desactivar);

export default router;
