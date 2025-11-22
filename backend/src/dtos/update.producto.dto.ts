import { IsOptional, IsNumber, Min, IsIn, IsString, MaxLength } from "class-validator";

export class ActualizarProductoDto {

    @IsOptional()
    @IsString({ message: "Debes poner la descripcion, nombre o la identificacion de la tarima" })
    @MaxLength(100, { message: "Debe ser un texto" })
    tarima: string;

    @IsOptional()
    @IsNumber({}, { message: "El stock actual debe ser un numero" })
    @Min(0, { message: "El stock actual no puede ser negativo" })
    stock_actual?: number;

    @IsOptional()
    @IsNumber({}, { message: "El stock minimo debe ser un número" })
    @Min(0, { message: "El stock mínimo no puede ser negativo" })
    stock_minimo?: number;

    @IsOptional()
    @IsIn(["sumar", "restar"])
    operacion?: "sumar" | "restar";

    @IsOptional()
    @IsNumber()
    cantidad?: number;

}
