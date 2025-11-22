import { ProductosTerminados } from "../entities/productosterminados.entity";
import { MateriaPrima } from "../entities/materiaprima.entity";
import { AppDataSource } from "../bd/data-source";

export class AlertasServicio {
    private repoMateria = AppDataSource.getRepository(MateriaPrima);
    private repoProducto = AppDataSource.getRepository(ProductosTerminados);

    //revisar stock de materia
    async revisarStockMateria(id_materia_prima: number) {
        const materia = await this.repoMateria.findOneBy({ id_materia_prima });
        if (!materia) return null;

        const stockActual = Number(materia.stock_actual);
        const stockMinimo = Number(materia.stock_minimo);

        if (stockActual <= stockMinimo) {
            const alerta = {
                tipo: "stock_bajo_materia",
                mensaje: `La materia '${materia.id_materia_prima}' está baja de stock (${stockActual}/${stockMinimo})`,
                fecha: new Date(),
            };
            return alerta;
        }

        return null;
    }

    //revisar stock de producto 
    async revisarStockProducto(id_producto_terminado: number) {
        const producto = await this.repoProducto.findOneBy({ id_producto_terminado });
        if (!producto) return null;

        const stockActual = Number(producto.stock_actual);
        const stockMinimo = Number(producto.stock_minimo);

        if (stockActual <= stockMinimo) {
            return {
                tipo: "stock_bajo_producto",
                mensaje: `El producto '${producto.id_producto_terminado}' está bajo de stock (${stockActual}/${stockMinimo})`,
                fecha: new Date(),
            };
        }

        return null;
    }
}
