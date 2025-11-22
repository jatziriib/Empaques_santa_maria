import { IsOptional, IsNumber, Min, IsIn, IsString, MaxLength } from "class-validator";

export class ActualizarMateriaPrimaDto {

  @IsOptional()
  @IsString({ message: "El tipo debe ser un texto" })
  @MaxLength(50, { message: "El tipo no puede tener más de 50 caracteres" })
  tipo: string;

  @IsOptional()
  @IsNumber({}, { message: "El ancho debe ser un número" })
  @Min(0, { message: "El ancho no puede ser negativo" })
  ancho: number;

  @IsOptional()
  @IsNumber({}, { message: "El largo debe ser un número" })
  @Min(0, { message: "El largo no puede ser negativo" })
  largo: number;

  @IsOptional()
  @IsNumber({}, { message: "El stock actual debe ser un número" })
  @Min(0, { message: "El stock actual no puede ser negativo" })
  stock_actual?: number;

  @IsOptional()
  @IsNumber({}, { message: "El stock mínimo debe ser un número" })
  @Min(0, { message: "El stock mínimo no puede ser negativo" })
  stock_minimo?: number;

  //para los movimientos
  @IsOptional()
  @IsIn(["sumar", "restar"])
  operacion?: "sumar" | "restar";

  @IsOptional()
  @IsNumber()
  cantidad?: number;
}
