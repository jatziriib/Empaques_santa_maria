import { IsEmail, IsNotEmpty, MinLength, IsEnum } from "class-validator";

export class DtoRegistro{
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  nombre: string;

  @IsNotEmpty({ message: "Los apellidos son obligatorios" })
  apellidos: string;

  @IsEmail({}, { message: "El correo debe ser válido" })
  correo: string;

  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  contrasena: string;

  @IsNotEmpty({ message: "El rol es obligatorio" })
  @IsEnum(["admin", "encargadotarimas", "encargadocompras"], {
    message: "El rol debe ser admin, encargado de tarimas o encargado de compras",
  })
  rol: string;
}
