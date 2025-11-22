import { IsNotEmpty, IsNumber, Min, IsString, MaxLength } from "class-validator";

export class CrearProductoTerminadoDto {
    @IsNotEmpty({ message: "Debes poner la descripcion, nombre o la identificacion de la tarima" })
    @IsString({ message: "Debe ser un texto" })
    @MaxLength(100, { message: "El tipo no puede tener más de 50 caracteres" })
    tarima: string;

    @IsNotEmpty({ message: "Debes poner el stock actual" })
    @IsNumber({}, { message: "El stock actual debe ser un número" })
    @Min(0, { message: "El stock actual no puede ser negativo" })
    stock_actual: number;

    @IsNotEmpty({ message: "Debes poner el stock mínimo" })
    @IsNumber({}, { message: "El stock mínimo debe ser un número" })
    @Min(0, { message: "El stock mínimo no puede ser negativo" })
    stock_minimo: number;
}