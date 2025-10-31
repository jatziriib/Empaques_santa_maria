import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: "El correo debe ser válido" })
  correo: string;

    @IsNotEmpty({ message: "La contraseña es obligatoria" })
    @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    contrasena: string;
}
