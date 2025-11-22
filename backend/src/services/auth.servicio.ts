import { AppDataSource } from "../bd/data-source";
import { Usuario } from "../entities/usuario.entity";
import { Rol } from "../entities/rol.entity";
import { DtoRegistro } from "../dtos/registros.dto";
import { LoginDto } from "../dtos/login.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";



//tipo OTP
type OTP = {
  otp: string;
  expira: number;
};

export class AuthServicio {
  private usrRepositorio = AppDataSource.getRepository(Usuario);
  private rolRepositorio = AppDataSource.getRepository(Rol);

  //OTP en cache, esta como propiedad de la clase
  private otpn = new Map<string, OTP>();

  //registro
  async registrar(data: DtoRegistro): Promise<Usuario> {
    const existe = await this.usrRepositorio.findOneBy({ correo: data.correo });
    if (existe) throw new Error("El correo ya está registrado");

    const rol = await this.rolRepositorio.findOneBy({ nombre: data.rol });
    if (!rol) throw new Error("Rol no encontrado");

    const hashearContrasena = await bcrypt.hash(data.contrasena, 10);

    const usuario = this.usrRepositorio.create({
      nombre: data.nombre,
      apellidos: data.apellidos,
      correo: data.correo,
      contrasena: hashearContrasena,
      rol,
    });

    return this.usrRepositorio.save(usuario);
  }

  //login
  async login(data: LoginDto): Promise<{ token: string }> {
    const usuario = await this.usrRepositorio.findOne({
      where: { correo: data.correo },
      relations: ["rol"],
    });

    if (!usuario) throw new Error("Credenciales inválidas");

    const contrasenaValida = await bcrypt.compare(data.contrasena, usuario.contrasena);
    if (!contrasenaValida) throw new Error("Credenciales inválidas");

    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.rol.nombre },
      process.env.JWT_SECRET || "secretoo",
      { expiresIn: "1h" }
    );

    return { token };
  }

  //generar OTP y enviar correo
  async enviarOtp(correo: string) {
    const usuario = await this.usrRepositorio.findOneBy({ correo });
    if (!usuario) throw new Error("usr no encontrado");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expira = Date.now() + 10 * 60 * 1000; // 10 minutos
    this.otpn.set(correo, { otp, expira });

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transport.sendMail({
      from: process.env.SMTP_USER,
      to: correo,
      subject: "Codigo para restablecer contraseña",
      text: `EL codigo es: ${otp}. Expira en 10 minutos.`,
    });
  }

  //verificar OTP
  async verificarOtp(correo: string, otp: string): Promise<boolean> {
    const entrada = this.otpn.get(correo);
    if (!entrada) return false;

    if (Date.now() > entrada.expira) {
      this.otpn.delete(correo);
      return false;
    }

    if (entrada.otp !== otp) return false;

    this.otpn.delete(correo); //OTP usado
    return true;
  }

  //restablecer contrasena
  async restablecerContrasena(correo: string, nueva_contrasena: string) {
    const usuario = await this.usrRepositorio.findOneBy({ correo });
    if (!usuario) throw new Error("Usuario no encontrado");

    const hashed = await bcrypt.hash(nueva_contrasena, 10);
    usuario.contrasena = hashed;

    return this.usrRepositorio.save(usuario);
  }
}