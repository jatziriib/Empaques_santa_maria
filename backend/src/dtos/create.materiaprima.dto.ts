import { IsNotEmpty, IsNumber, Min, IsString, MaxLength} from "class-validator";

export class CrearMateriaPrimaDto {

    @IsNotEmpty({ message: "Debes poner el tipo de materia prima" }) 
    @IsString({ message: "El tipo debe ser un texto" }) 
    @MaxLength(50, { message: "El tipo no puede tener más de 50 caracteres" }) 
    tipo: string;

    @IsNotEmpty({ message: "Debes poner el ancho" }) 
    @IsNumber({}, { message: "El ancho debe ser un número" }) 
    @Min(0, { message: "El ancho no puede ser negativo" }) 
    ancho: number;
    
    @IsNotEmpty({ message: "Debes poner el largo" })
    @IsNumber({}, { message: "El largo debe ser un número" }) 
    @Min(0, { message: "El largo no puede ser negativo" }) 
    largo: number;

    @IsNotEmpty({ message: "Debes poner el stock actual" })
    @IsNumber({}, { message: "El stock actual debe ser un número" })
    @Min(0, { message: "El stock actual no puede ser negativo" })
    stock_actual: number;

    @IsNotEmpty({ message: "Debes poner el stock mínimo" })
    @IsNumber({}, { message: "El stock mínimo debe ser un número" })
    @Min(0, { message: "El stock mínimo no puede ser negativo" })
    stock_minimo: number;
  
}
