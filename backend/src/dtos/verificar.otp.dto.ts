import { IsEmail, IsString, Length } from "class-validator";

export class VerificarOtpDto {
    @IsEmail()
    correo: string;

    @IsString()
    @Length(6, 6)
    otp: string;
}