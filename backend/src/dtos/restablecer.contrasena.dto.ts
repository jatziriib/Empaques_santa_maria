import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RestablecerContrasenaDto {
    @IsEmail({}, { message: "El correo debe ser válido" })
    correo: string;

    @IsNotEmpty({ message: "La contrasena es obligatoria" })
    @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    nueva_contrasena: string;
}