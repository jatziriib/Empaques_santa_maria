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
//delete producto
router.delete("/:id_producto_terminado", ProductoTerminadoController.delete);

export default router;
