import { AppDataSource } from "../bd/data-source";
import { Usuario } from "../entities/usuario.entity";
import { Rol } from "../entities/rol.entity";
import { RegistroDto } from "../dtos/registro.dto";
import { LoginDto } from "../dtos/login.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthServicio {
  private userRepository = AppDataSource.getRepository(Usuario);
  private rolRepository = AppDataSource.getRepository(Rol);

  //Registrar usuario
  async registrar(data: RegistroDto): Promise<Usuario> {
    //ver si el correo ya existe
    const existe = await this.userRepository.findOneBy({ correo: data.correo });
    if (existe) throw new Error("El correo ya está registrado");

    //buscar rol en bd
    const rol = await this.rolRepository.findOneBy({ nombre: data.rol });
    if (!rol) throw new Error("Rol no encontrado");

    //hashear la contraseña
    const hashearContrasena = await bcrypt.hash(data.contrasena, 10);

    //crear usuario
    const usuario = this.userRepository.create({
      nombre: data.nombre,
      apellidos:data.apellidos,
      correo: data.correo,
      contrasena: hashearContrasena,
      rol,
    });

    return this.userRepository.save(usuario);
  }

  //iniciar sesion
  async login(data: LoginDto): Promise<{ token: string }> {
    const usuario = await this.userRepository.findOne({
      where: { correo: data.correo },
      relations: ["rol"],
    });

    if (!usuario) throw new Error("Credenciales inválidas");

    //validar contrasena
    const contrasenaValida = await bcrypt.compare(data.contrasena, usuario.contrasena);
    if (!contrasenaValida) throw new Error("Credenciales inválidas");

    //geberar el token
    const token = jwt.sign(
        { id: usuario.id_usuario, rol: usuario.rol.nombre },
        process.env.JWT_SECRET || "secretoo",
        { expiresIn: "1h" }
    );

    return { token };
  }
}