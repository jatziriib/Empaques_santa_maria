import { Router } from "express";
import { MateriaPrimaController } from "../controllers/materiaprima.controller";

const router = Router();

//get materia
router.get("/", MateriaPrimaController.getAll);
//get x id
router.get("/:id_materia_prima", MateriaPrimaController.getById);
//post materia
router.post("/", MateriaPrimaController.create);
//update materia
router.put("/:id_materia_prima", MateriaPrimaController.update);
//desactivar materia
router.patch("/:id_materia_prima", MateriaPrimaController.desactivar);

export default router;
