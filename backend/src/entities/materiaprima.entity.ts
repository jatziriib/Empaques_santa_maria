import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Movimientos } from "./movimientos.entity";

@Entity("materia_prima")
export class MateriaPrima {

    @PrimaryGeneratedColumn()
    id_materia_prima: number;
    
    @Column({ type: "numeric", precision: 6, scale: 0, nullable: false })
    stock_actual: number;

    @Column({ type: "numeric", precision: 6, scale: 0, nullable: false })
    stock_minimo: number;

    @CreateDateColumn({ type: 'timestamp' })
    fecha_registro: Date;

    @CreateDateColumn({ type: 'timestamp' })
    fecha_actualizacion: Date;

    @OneToMany(() => Movimientos, (movimiento) => movimiento.materiaPrima)
    movimientos_inventario: Movimientos[];
}

