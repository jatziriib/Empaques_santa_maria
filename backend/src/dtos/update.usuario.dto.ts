import { IsEmail, MinLength, IsOptional, IsEnum } from "class-validator";
import { Rol } from "../entities/rol.entity";

export class ActualizarUsuarioDto {
    @IsOptional()
    nombre?: string;

    @IsOptional()
    apellidos?: string;

    @IsOptional()
    @IsEmail({}, { message: "El correo debe ser válido" })
    correo?: string;

    @IsOptional()
    @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    contrasena?: string;

    @IsOptional()
    @IsEnum(["jefe", "trabajador"], { message: "El rol debe ser jefe o trabajador" })
    rol?: string;
}
