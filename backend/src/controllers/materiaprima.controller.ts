import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { CrearMateriaPrimaDto } from "../dtos/create.materiaprima.dto";
import { ActualizarMateriaPrimaDto } from "../dtos/update.materiaprima.dto";
import { MateriaPrimaServicio } from "../services/materiaprima.servicio";

const materiaPrimaServicio = new MateriaPrimaServicio();

export class MateriaPrimaController {
    //get de los materiales
      static async getAll(req: Request, res: Response) {
        try {
          const materiaPrima = await materiaPrimaServicio.getAll();
          res.json(materiaPrima);
        }
        catch (err) {
          res.status(500).json({ message: "Error al obtenerer usuarios", error: err });
    
        }
      }

    //get x id
    static async getById(req: Request, res: Response) {
        const id_materia_prima = Number(req.params.id_materia_prima);
        if (isNaN(id_materia_prima)) return res.status(400).json({ message: " ID no es valido" });

        try {
            const materiaPrima = await materiaPrimaServicio.getById(id_materia_prima);
            if (!materiaPrima) return res.status(404).json({ message: "Material no encontrado" });
            res.json(materiaPrima);
        } catch (err) {
            res.status(500).json({ message: "Error al obtener material", error: err });
        }
    }

    //create materia
    static async create(req: Request, res: Response) {
        const dto = plainToClass(CrearMateriaPrimaDto, req.body);
        const errores = await validate(dto);

        if (errores.length > 0) {
            return res.status(400).json(errores);
        }

        try {
            const nuevaMateriaPrima = await materiaPrimaServicio.create(dto);
            res.status(201).json(nuevaMateriaPrima);
        } catch (err) {
            res.status(500).json({ message: "Error al crear materia" });
        }
    }

    //update materia
    static async update(req: Request, res: Response) {
        const id_materia_prima = Number(req.params.id_materia_prima);
        const dto = plainToClass(ActualizarMateriaPrimaDto, req.body);
        const errores = await validate(dto);

        if (errores.length > 0) {
            return res.status(400).json(errores);
        }
        try {
            const updateMateriaPrima = await materiaPrimaServicio.update(id_materia_prima, dto);
            if (!updateMateriaPrima) return res.status(404).json({ message: "Materia no encontrada" });
            res.json(updateMateriaPrima);

        } catch (err) {
            res.status(500).json({ message: "Error al actualizar material" });
        }
    }

    //delete material
    static async delete(req: Request, res: Response) {
        const id_materia_prima = Number(req.params.id_materia_prima);
        try {
            const exitoso = await materiaPrimaServicio.delete(id_materia_prima);
            if (!exitoso) return res.status(404).json({ message: "Material no encontrado" });
            res.json({ message: "Material eliminado" });
        } catch (err) {
            res.status(500).json({ message: "Error al eliminar material", error: err });
        }
    }
}

