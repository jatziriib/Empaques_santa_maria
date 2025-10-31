import { ProductosTerminados } from "../entities/productosterminados.entity";
import { MateriaPrima } from "../entities/materiaprima.entity";
import { AppDataSource } from "../bd/data-source";

export class AlertasServicio {
    private repoMateria = AppDataSource.getRepository(MateriaPrima);
    private repoProducto = AppDataSource.getRepository(ProductosTerminados);

    async revisarStockMateria(id_materia_prima: number) {
        const materia = await this.repoMateria.findOneBy({ id_materia_prima });
        if (!materia) return null;

        if (materia.stock_actual <= materia.stock_minimo) {
            const alerta = {
                tipo: "stock_bajo_materia",
                mensaje: `La materia '${materia.id_materia_prima}' está baja de stock (${materia.stock_actual}/${materia.stock_minimo})`,
                fecha: new Date(),
            };
            console.log(alerta.mensaje);
            return alerta; //objeto alerta
        }
        return null;
    }

    async revisarStockProducto(id_producto_terminado: number) {
        const producto = await this.repoProducto.findOneBy({ id_producto_terminado });
        if (!producto) return null;

        if (producto.stock_actual <= producto.stock_minimo) {
            const alerta = {
                tipo: "stock_bajo_producto",
                mensaje: `El producto '${producto.id_producto_terminado}' está bajo de stock (${producto.stock_actual}/${producto.stock_minimo})`,
                fecha: new Date(),
            };
            console.log(alerta.mensaje);
            return alerta; 
        }
        return null;
    }
}
