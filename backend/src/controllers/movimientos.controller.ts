import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { MovimientosServicio } from "../services/movimientos.servicio";
import { validate } from "class-validator";
import { MovimientosInventarioDto } from "../dtos/movimientos.dto";

const movimientosServicio = new MovimientosServicio();

export class MovimientosController {
    //Get de todos los movimientos
        static async movimientos(req: Request, res: Response) {
        try {
            const movimiento = await movimientosServicio.movimientos();
            res.json(movimiento);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message })
        }
    }
    //registrar un movimiento segun el que sea
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
    //materia
    static async registrarEntradaMateria(req:Request, res:Response){
        await MovimientosController.registrarMov(req, res, "entrada_materia");
    }
    static async actualizacionMateria(req:Request, res:Response){
        await MovimientosController.registrarMov(req, res, "actualizacion");
    }
    static async eliminacionMateria(req:Request, res:Response){
        await MovimientosController.registrarMov(req, res, "eliminacion")
    }
    //productos
    static async registrarProductoTerm(req:Request, res:Response){
        await MovimientosController.registrarMov(req, res, "registro_producto_terminado");
    }
    static async registrarSalidaProductoTerm(req:Request, res:Response){
        await MovimientosController.registrarMov(req, res, "salida_producto_terminado");
    }
    static async actualizacionProducto(req:Request, res:Response){
        await MovimientosController.registrarMov(req, res, "actualizacion");
    }
    static async eliminacionProducto(req:Request, res:Response){
        await MovimientosController.registrarMov(req, res, "eliminacion")
    }    
}