import { ProductosTerminados } from "../entities/productosterminados.entity";
import { MateriaPrima } from "../entities/materiaprima.entity";
import { AppDataSource } from "../bd/data-source";

export class AlertasServicio {
    private repoMateria = AppDataSource.getRepository(MateriaPrima);
    private repoProducto = AppDataSource.getRepository(ProductosTerminados);

    //revisar materia
    async revisarStockMateria(id_materia_prima: number) {
        const materia = await this.repoMateria.findOneBy({ id_materia_prima });
        if (!materia) return null;

        if (materia.stock_actual <= materia.stock_minimo) {
            console.log(` Alerta: ${materia.id_materia_prima} esta bajo de stock (${materia.stock_actual}/${materia.stock_minimo})`);
            return materia;
        }
        return null;
    }

    //revisar productos
    async revisarStockProducto(id_producto_terminado: number) {
        const producto = await this.repoProducto.findOneBy({ id_producto_terminado });
        if (!producto) return null;

        if (producto.stock_actual <= producto.stock_minimo) {
            console.log(`Alerta: ${producto.id_producto_terminado} esta bajo de stock (${producto.stock_actual}/${producto.stock_minimo})`);
            return producto;
        }
        return null;
    }
}