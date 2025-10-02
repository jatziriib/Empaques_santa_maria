import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, UpdateDateColumn } from "typeorm";
import { Rol } from "./rol.entity";

@Entity("usuarios")
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({ length: 50, nullable: false })
    nombre: string;

    @Column({ length: 50, nullable: false })
    apellidos: string;

    @Column({ length: 100, nullable: false, unique: true })
    correo: string;

    @Column({ length: 255, nullable: false })
    contrasena: string;

    @CreateDateColumn({ type: 'timestamp' })
    fecha_registro: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    fecha_actualizacion: Date;

    @ManyToOne(() => Rol, (rol) => rol.usuarios, { nullable: false })
    @JoinColumn({ name: "id_rol" })
    rol: Rol;
}
