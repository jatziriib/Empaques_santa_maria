import { AppDataSource } from "../bd/data-source";
import { Usuario } from "../entities/usuario.entity";
import { CrearUsuarioDto } from "../dtos/create.usuario.dto";
import { ActualizarUsuarioDto } from "../dtos/update.usuario.dto";
import { Rol } from "../entities/rol.entity";
import bcrypt from "bcrypt";

export class UsuarioServicio {
    private userRepository = AppDataSource.getRepository(Usuario);
    private rolRepository = AppDataSource.getRepository(Rol);

    //Obtener todos los usuarios
    async getAll(): Promise<Usuario[]> {
        return this.userRepository.find();
    }

    //Obtener usuario x id
    async getById(id_usuario: number): Promise<Usuario | null> {
        return this.userRepository.findOneBy({ id_usuario });
    }

    //Crear un usuario
    async create(data: CrearUsuarioDto): Promise<Usuario> {
        const rol = await this.rolRepository.findOneBy({ nombre: data.rol });
        if (!rol) throw new Error("Rol no encontrado");

        // Hashear contraseña
        const contrasenaHasheada = await bcrypt.hash(data.contrasena, 10);

        const usuario = this.userRepository.create({
            nombre: data.nombre,
            apellidos: data.apellidos,
            correo: data.correo,
            contrasena: contrasenaHasheada,
            rol
        });

        return this.userRepository.save(usuario);
    }

    //Actualizar un usuario existente
    async update(id_usuario: number, data: ActualizarUsuarioDto): Promise<Usuario | null> {
    const usuario = await this.userRepository.findOne({ 
        where: { id_usuario },
        relations: ["rol"]
    });
    if (!usuario) return null;

    // Actualizar rol si se envía
    if (data.rol) {
        const rol = await this.rolRepository.findOneBy({ nombre: data.rol });
        if (!rol) throw new Error("Rol no encontrado");
        usuario.rol = rol;
    }

    // Actualizar y hashear contraseña si se envía
    if (data.contrasena) {
        usuario.contrasena = await bcrypt.hash(data.contrasena, 10);
    }

    // Actualizar otros campos opcionales
    if (data.nombre) usuario.nombre = data.nombre;
    if (data.apellidos) usuario.apellidos = data.apellidos;
    if (data.correo) usuario.correo = data.correo;

    return this.userRepository.save(usuario); // fecha_actualizacion se actualizará automáticamente
}
    


    //Eliminar usuario x id
    async delete(id_usuario: number): Promise<boolean> {
        const resultado = await this.userRepository.delete(id_usuario);
        return resultado.affected === 1;
    }
}
