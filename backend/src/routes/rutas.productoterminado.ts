import { Router } from "express";
import { ProductoTerminadoController } from "../controllers/productos.controller";
const router = Router();

//get productos
router.get("/", ProductoTerminadoController.getAll);
//get x id
router.get("/:id_producto_terminado", ProductoTerminadoController.getById);
//post producto
router.post("/", ProductoTerminadoController.create);
//update producto
router.put("/:id_producto_terminado", ProductoTerminadoController.update);
//desactivar producto
router.put("/:id_producto_terminado", ProductoTerminadoController.desactivar);

export default router;
