import { AppDataSource } from "../bd/data-source";
import { Movimientos } from "../entities/movimientos.entity";
import { MateriaPrima } from "../entities/materiaprima.entity";
import { ProductosTerminados } from "../entities/productosterminados.entity";
import { Usuario } from "../entities/usuario.entity";
import { MovimientosInventarioDto } from "../dtos/movimientos.dto";
import { AlertasServicio } from "./alertastock.servicio";
import nodemailer from "nodemailer";


export class MovimientosServicio {
    private repo = AppDataSource.getRepository(Movimientos);
    private repoMateria = AppDataSource.getRepository(MateriaPrima);
    private repoProductosT = AppDataSource.getRepository(ProductosTerminados);
    private repoUsr = AppDataSource.getRepository(Usuario);
    private alertaServicio = new AlertasServicio();

    async registrar(data: MovimientosInventarioDto) {
        const movimiento = new Movimientos();

        movimiento.tipo_movimiento = data.tipo_movimiento;
        movimiento.cantidad = data.cantidad;

        //relacion de ids si hay 
        if (data.id_materia_prima) {
            movimiento.materiaPrima = await this.repoMateria.findOneBy({ id_materia_prima: data.id_materia_prima });
        }
        if (data.id_producto_terminado) {
            movimiento.productosTerminados = await this.repoProductosT.findOneBy({ id_producto_terminado: data.id_producto_terminado });
        }
        if (data.id_usuario) {
            movimiento.usuario = await this.repoUsr.findOneBy({ id_usuario: data.id_usuario });
        }

        const guardado = await this.repo.save(movimiento);

        //si es una devolución se suma al stock y se manda correo
        if (data.tipo_movimiento === "devolucion") {
            if (data.id_materia_prima) {
                const materia = await this.repoMateria.findOneBy({ id_materia_prima: data.id_materia_prima });
                if (materia) {
                    materia.stock_actual += data.cantidad;
                    await this.repoMateria.save(materia);
                }
            } else if (data.id_producto_terminado) {
                const producto = await this.repoProductosT.findOneBy({ id_producto_terminado: data.id_producto_terminado });
                if (producto) {
                    producto.stock_actual += data.cantidad;
                    await this.repoProductosT.save(producto);
                }
            }

            //busca encargado de compras
            const encargadoCompras = await this.repoUsr.findOne({
                where: { rol: { nombre: "encargadocompras" } },
                relations: ["rol"],
            });

            if (encargadoCompras && encargadoCompras.correo) {
                const transCorreos = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: Number(process.env.SMTP_PORT),
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                });
                await transCorreos.sendMail({
                    from: process.env.SMTP_USER,
                    to: encargadoCompras.correo,
                    subject: "Notificación de Devolución",
                    text: `Se ha registrado una devolución en el inventario por el usuario ${movimiento.usuario?.nombre || "desconocido"}.`,
                });
            } else {
                console.warn("No se encontro al encargado de compras o no tiene un correo registrado.");
            }
        }

        //checar si hay alerta
        let alerta = null;
        if (data.id_producto_terminado) {
            alerta = await this.alertaServicio.revisarStockProducto(data.id_producto_terminado);
        } else if (data.id_materia_prima) {
            alerta = await this.alertaServicio.revisarStockMateria(data.id_materia_prima);
        }

        //devolver en el json
        return {
            mensaje: "Movimiento registrado correctamente",
            movimiento: guardado,
            alerta, //null o la alerta
        };
    }

    async actualizar(id_movimiento: number, data: MovimientosInventarioDto) {
        const movimiento = await this.repo.findOne({ where: { id_movimiento }, relations: ["materiaPrima", "productosTerminados"] });
        if (!movimiento) throw new Error("Movimiento no encontrado");


        //update de campos
        movimiento.tipo_movimiento = data.tipo_movimiento ?? movimiento.tipo_movimiento;
        movimiento.cantidad = data.cantidad ?? movimiento.cantidad;

        //actualizar las relaciones si se cambian
        if (data.id_materia_prima) {
            movimiento.materiaPrima = await this.repoMateria.findOneBy({ id_materia_prima: data.id_materia_prima });
        }
        if (data.id_producto_terminado) {
            movimiento.productosTerminados = await this.repoProductosT.findOneBy({ id_producto_terminado: data.id_producto_terminado });
        }
        const guardar = await this.repo.save(movimiento);

        //checar alertas
        let alerta = null;
        if (movimiento.productosTerminados) {
            alerta = await this.alertaServicio.revisarStockProducto(movimiento.productosTerminados.id_producto_terminado);
        } else if (movimiento.materiaPrima) {
            alerta = await this.alertaServicio.revisarStockMateria(movimiento.materiaPrima.id_materia_prima);
        }
        return { mensaje: "Movimiento actualizado correctamente", movimiento: guardar, alerta };
    }
    //tolos los movimientos
    async movimientos(): Promise<Movimientos[]> {
        return this.repo.find({
            relations: ["usuario", "materiaPrima", "productosTerminados"],
            order: { fecha_movimiento: "DESC" }
        });
    }
}
