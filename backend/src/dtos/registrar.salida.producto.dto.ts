import { IsInt, IsPositive } from "class-validator";

export class RegistrarSalidaProductoDto {
  @IsInt({ message: "La cantidad debe ser un número entero" })
  @IsPositive({ message: "La cantidad debe ser mayor que 0" })
  cantidad: number;

  @IsInt({ message: "El id_usuario debe ser un número entero" })
  id_usuario: number;
}