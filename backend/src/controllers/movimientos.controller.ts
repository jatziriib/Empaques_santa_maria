import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { MovimientosServicio } from "../services/movimientos.servicio";
import { validate } from "class-validator";
import { MovimientosInventarioDto } from "../dtos/movimientos.dto";
import { MateriaPrimaServicio } from "../services/materiaprima.servicio";
import { CrearProductoTerminadoDto } from "../dtos/create.productoterminado.dto";
import { ProductoTerminadoServicio } from "../services/productoterminado.servicio";
import { RegistrarSalidaProductoDto } from "../dtos/registrar.salida.producto.dto";
import { ActualizarMateriaPrimaDto } from "../dtos/update.materiaprima.dto";
import { ActualizarProductoDto } from "../dtos/update.producto.dto";


const movimientosServicio = new MovimientosServicio();


export class MovimientosController {

    //get de todos los movimientos
    static async movimientos(req: Request, res: Response) {
        try {
            const movimiento = await movimientosServicio.movimientos();
            res.json(movimiento);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message })
        }
    }

    //registrar los tipos de movimientos
    static async registrarMov(req: Request, res: Response, tipo: string) {
        const dto = plainToClass(MovimientosInventarioDto, req.body);
        const errores = await validate(dto);

        if (errores.length > 0) return res.status(400).json(errores);

        try {
            dto.tipo_movimiento = tipo;
            const movimiento = await movimientosServicio.registrar(dto);
            res.status(201).json(movimiento);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    //registrar materia
    static async registrarEntradaMateria(req: Request, res: Response) {
        const dto = plainToClass(MovimientosInventarioDto, req.body);
        const errores = await validate(dto);
        if (errores.length > 0) return res.status(400).json(errores);

        try {
            // Llamar al servicio de MateriaPrima que actualiza stock
            const materiaPrimaServicio = new MateriaPrimaServicio();
            const materia = await materiaPrimaServicio.registrarMovimiento(
                dto.id_materia_prima,
                "entrada_materia",
                dto.cantidad,
                dto.id_usuario
            );
            res.status(201).json({ mensaje: "Movimiento registrado correctamente", movimiento: materia });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    //actualizar materia
    static async actualizacionMateria(req: Request, res: Response) {
        const id_materia_prima = Number(req.params.id_materia_prima);
        const dto = plainToClass(ActualizarMateriaPrimaDto, req.body);
        const errores = await validate(dto);

        if (errores.length > 0) {
            return res.status(400).json(errores);
        }

        try {
            const materiaServicio = new MateriaPrimaServicio();

            //usr que viene del token
            const id_usuario = (req as any).usuario.id_usuario;

            const actualizada = await materiaServicio.update(
                id_materia_prima,
                dto,
                id_usuario
            );

            if (!actualizada) {
                return res.status(404).json({ message: "Materia prima no encontrada" });
            }

            res.status(200).json({
                message: "Actualizacion registrada correctamente",
                materia: actualizada,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    //desactivar materia
    static async desactivacionMateria(req: Request, res: Response) {
        const id_materia_prima = Number(req.params.id_materia_prima);
        const id_usuario = (req as any).usuario.id_usuario;

        try {
            const materiaServicio = new MateriaPrimaServicio();
            const resultado = await materiaServicio.desactivar(id_materia_prima, id_usuario);

            if (!resultado) {
                return res.status(404).json({ message: "Materia prima no encontrada" });
            }

            res.status(200).json({ message: "Materia prima desactivada correctamente" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    //devolucion de materia
    static async devolucionMateria(req: Request, res: Response) {
        await MovimientosController.registrarMov(req, res, "devolucion");
    }

   
    //crear producto, nadamas lo registra 
    static async create(req: Request, res: Response) {
        const dto = plainToClass(CrearProductoTerminadoDto, req.body);
        const errores = await validate(dto);
        if (errores.length > 0) return res.status(400).json(errores);

        try {
            const productoServicio = new ProductoTerminadoServicio();
            const nuevoProducto = await productoServicio.create(dto);
            res.status(201).json(nuevoProducto);
        } catch (err: any) {
            res.status(500).json({ message: "Error al registrar el producto", error: err.message });
        }
    }

    //registrar la salida del producto
    static async registrarSalida(req: Request, res: Response) {
        const { id_producto_terminado, cantidad, id_usuario } = plainToClass(RegistrarSalidaProductoDto, req.body);

        const id = Number(id_producto_terminado);
        const cant = Number(cantidad);

        if (isNaN(id) || isNaN(cant) || cant <= 0) {
            return res.status(400).json({ message: "id o cantidad invalidos" });
        }

        try {
            const productoServicio = new ProductoTerminadoServicio();
            const movimiento = await productoServicio.registrarSalida(id, cant, id_usuario);
            res.status(201).json({ message: "Salida registrada correctamente", movimiento });
        } catch (err: any) {
            res.status(500).json({ message: err.message || "Error al registrar salida" });
        }
    }


    //registrar actualizacion de producto
    static async actualizacionProducto(req: Request, res: Response) {
        const id_producto_terminado = Number(req.params.id_producto_terminado);
        const dto = plainToClass(ActualizarProductoDto, req.body);
        const errores = await validate(dto);

        if (errores.length > 0) {
            return res.status(400).json(errores);
        }

        try {
            const productoServicio = new ProductoTerminadoServicio();

            //usr token
            const id_usuario = (req as any).usuario.id_usuario;

            const actualizada = await productoServicio.update(
                id_producto_terminado,
                dto,
                id_usuario
            );

            if (!actualizada) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            res.status(200).json({
                message: "Actualizacion registrada correctamente",
                producto: actualizada,
            });

        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }


    //desactivar producto
    static async desactivacionProducto(req: Request, res: Response) {
        const id_producto_terminado = Number(req.params.id_producto_terminado); // <- de params, no body
        const id_usuario = (req as any).usuario.id_usuario;

        if (isNaN(id_producto_terminado)) {
            return res.status(400).json({ message: "id de producto inválido" });
        }

        try {
            const servicio = new ProductoTerminadoServicio();
            const resultado = await servicio.desactivar(id_producto_terminado, id_usuario);

            if (!resultado) return res.status(404).json({ message: "Producto no encontrado" });

            res.status(200).json({
                message: resultado.mensaje,
                producto: resultado.producto,
                alerta: resultado.alerta
            });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    //devolucion de producto
    static async devolucionProducto(req: Request, res: Response) {
        await MovimientosController.registrarMov(req, res, "devolucion");
    }

}
