import { Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm";
import {Usuario}  from "./usuario.entity";

@Entity("roles")
export class Rol {

    @PrimaryGeneratedColumn()
    id_rol:number;
    
    @Column({
        type: "enum",
        enum: [
            "admin",
            "encargadotarimas", 
            "encargadocompras"
        ],
    })
    nombre: string;

   @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[];

    @CreateDateColumn({ type: 'timestamp' })
    fecha_creacion: Date;

}