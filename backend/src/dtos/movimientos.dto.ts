import { IsOptional, IsString, IsNumber, IsEnum } from "class-validator";

export class MovimientosInventarioDto {
    @IsEnum([
        "entrada_materia",
        "salida_producto_terminado",
        "registro_producto terminado",
        "actualizacion",
        "eliminacion"
    ])
    tipo_movimiento: string;

    @IsNumber()
    cantidad: number;

    @IsOptional()
    @IsNumber()
    id_usuario?: number;

    @IsOptional()
    @IsNumber()
    id_materia_prima?: number;

    @IsOptional()
    @IsNumber()
    id_producto_terminado?: number;


}