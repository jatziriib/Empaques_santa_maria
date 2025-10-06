import { IsOptional, IsNumber, Min } from "class-validator";

export class ActualizarProductoDto {
    @IsOptional()
    @IsNumber({}, { message: "El stock actual debe ser un número" })
    @Min(0, { message: "El stock actual no puede ser negativo" })
    stock_actual?: number;
    
    @IsOptional()
    @IsNumber({}, { message: "El stock mínimo debe ser un número" })
    @Min(0, { message: "El stock mínimo no puede ser negativo" })
    stock_minimo?: number;
}
