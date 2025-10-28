import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from "typeorm";
import { Movimientos } from "./movimientos.entity";

@Entity("productos_terminados")
export class ProductosTerminados{

    @PrimaryGeneratedColumn()
    id_producto_terminado: number;
    
    @Column({ type: "numeric", precision: 6, scale: 0, nullable: false })
    stock_actual: number;

    @Column({ type: "numeric", precision: 6, scale: 0, nullable: false })
    stock_minimo: number;

    @Column({ type: "boolean", default: true})
    activo: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    fecha_registro: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    fecha_actualizacion: Date;

    @OneToMany(() => Movimientos, (movimiento) => movimiento.productosTerminados)
    movimientos_inventario: Movimientos[];
}
