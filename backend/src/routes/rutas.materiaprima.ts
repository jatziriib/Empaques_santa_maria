import { Router } from "express";
import { MateriaPrimaController } from "../controllers/materiaprima.controller";
import { verificarRol, verificarToken } from "../utils/verificarAuth";

const router = Router();

//rutas publicas
//get materia
router.get("/", MateriaPrimaController.getAll);
//get x id
router.get("/:id_materia_prima", MateriaPrimaController.getById);

//rutas priv
//post materia
router.post("/", verificarToken, verificarRol(["admin", "encargadotarimas"]),MateriaPrimaController.create);
//update materia
router.put("/:id_materia_prima", verificarToken, verificarRol(["admin", "encargadotarimas"]),MateriaPrimaController.update);
//desactivar materia
router.patch("/:id_materia_prima", verificarToken, verificarRol(["admin", "encargadotarimas"]),MateriaPrimaController.desactivar);
export default router;
