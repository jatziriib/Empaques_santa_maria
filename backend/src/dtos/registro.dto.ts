import { IsEmail, IsNotEmpty, MinLength, IsEnum } from "class-validator";

export class RegistroDto {
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
    @IsEnum(["jefe", "trabajador"], { message: "El rol debe ser jefe o trabajador" })
    rol: string;
}
