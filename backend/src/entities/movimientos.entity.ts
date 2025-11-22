import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { MateriaPrima } from "./materiaprima.entity";
import { ProductosTerminados } from "./productosterminados.entity";
import { Usuario } from "./usuario.entity";

@Entity("movimientos_inventario")
export class Movimientos {

    @PrimaryGeneratedColumn()
    id_movimiento: number;

    @Column({
        type: "enum",
        enum: [
            "entrada_materia",
            "salida_producto_terminado",
            "actualizacion",
            "desactivacion",
            "devolucion",
        ],
    })
    tipo_movimiento: string;

    @Column({ type: "numeric", precision: 6, scale: 0, nullable: true })
    cantidad: number; 

    @CreateDateColumn({ type: 'timestamp' })
    fecha_movimiento: Date;

    @ManyToOne(() => Usuario, usuario => usuario.movimientos_inventario, { nullable: true })
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @ManyToOne(() => MateriaPrima, materiaPrima => materiaPrima.movimientos_inventario, { nullable: true })
    @JoinColumn({ name: 'id_materia_prima' })
    materiaPrima: MateriaPrima;

    @ManyToOne(() => ProductosTerminados, productosTerminados => productosTerminados.movimientos_inventario, { nullable: true })
    @JoinColumn({ name: 'id_producto_terminado' })
    productosTerminados: ProductosTerminados;

}
