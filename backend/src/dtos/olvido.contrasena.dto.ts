import { IsEmail } from "class-validator";

export class OlvidoContrasenaDto{
    @IsEmail()
    correo:string;
}