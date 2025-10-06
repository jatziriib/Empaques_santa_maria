import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { CrearProductoTerminadoDto } from "../dtos/create.productoterminado.dto";
import { ActualizarProductoDto } from "../dtos/update.producto.dto";
import { ProductoTerminadoServicio } from "../services/productoterminado.servicio";

const productoTerminadoServicio = new ProductoTerminadoServicio();

export class ProductoTerminadoController {
    //get de productos
    static async getAll(req: Request, res: Response) {
        try {
            const productoTerminado = await productoTerminadoServicio.getAll();
            res.json(productoTerminado);
        } catch (err) {
            res.status(500).json({ message: "Error al obtener los productos", error: err })
        }
    }
    //get x id
    static async getById(req: Request, res: Response) {
        const id_producto_terminado = Number(req.params.id_producto_terminado);
        if (isNaN(id_producto_terminado)) return res.status(400).json({ message: "ID no es valido" });

        try {
            const productoTerminado = productoTerminadoServicio.getById(id_producto_terminado);
            if (!productoTerminado) return res.status(404).json({ message: "Producto no encontrado" });
        } catch (err) {
            res.status(500).json({ message: "Error al ontener el producto", error: err })
        }
    }
    //create producto
    static async create(req: Request, res: Response) {
        const dto = plainToClass(CrearProductoTerminadoDto, req.body);
        const errores = await validate(dto);

        if (errores.length > 0) {
            return res.status(400).json(errores);
        }

        try {
            const nuevaMateriaPrima = await productoTerminadoServicio.create(dto);
            res.status(201).json(nuevaMateriaPrima);
        } catch (err) {
            res.status(500).json({ message: "Error al crear producto" });
        }
    }
    //update producto
    static async update(req: Request, res: Response) {
        const id_producto_terminado = Number(req.params.id_producto_terminado);
        const dto = plainToClass(ActualizarProductoDto, req.body);
        const errores = await validate(dto);

        if (errores.length > 0) {
            return res.status(400).json(errores);
        }
        try {
            const updateProducto = await productoTerminadoServicio.update(id_producto_terminado, dto);
            if (!updateProducto) return res.status(404).json({ message: "Producto no encontrado" });
            res.json(updateProducto);

        } catch (err) {
            res.status(500).json({ message: "Error al actualizar el producto" });
        }
    }

    //delete material
    static async delete(req: Request, res: Response) {
        const id_producto_terminado = Number(req.params.id_producto_terminado);
        try {
            const exitoso = await productoTerminadoServicio.delete(id_producto_terminado);
            if (!exitoso) return res.status(404).json({ message: "Producto no encontrado" });
            res.json({ message: "Producto eliminado" });
        } catch (err) {
            res.status(500).json({ message: "Error al eliminar producto", error: err });
        }
    }
}

