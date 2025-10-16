import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { MovimientosServicio } from "../services/movimientos.servicio";
import { validate} from "class-validator";
import { MovimientosInventarioDto } from "../dtos/movimientos.dto";

const movimientosServicio = new MovimientosServicio();

export class MovimientosController{
    //registrar
    static async registrar(req:Request, res:Response){
        const dto = plainToClass(MovimientosInventarioDto, req.body);
        const errores = await validate(dto);
        if(errores.length > 0) return res.status(400).json(errores);

        try {
            const movimiento = await movimientosServicio.registrar(dto);
            res.status(201).json(movimiento);
        }catch(error){
            res.status(500).json({message: (error as Error).message});
        }
    }

    //todos los movimientos
    static async movimientos(req: Request, res: Response){
        try{
            const movimiento = await movimientosServicio.movimientos();
            res.json(movimiento);
        }catch(error){
            res.status(500).json({message:(error as Error).message})
        }
    }
}