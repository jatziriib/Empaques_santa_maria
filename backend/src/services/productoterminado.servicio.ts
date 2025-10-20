import { AppDataSource } from "../bd/data-source";
import { ProductosTerminados } from "../entities/productosterminados.entity";
import { CrearProductoTerminadoDto } from "../dtos/create.productoterminado.dto";
import { ActualizarProductoDto } from "../dtos/update.producto.dto";
import { MovimientosServicio } from "./movimientos.servicio";

export class ProductoTerminadoServicio {
    private repo = AppDataSource.getRepository(ProductosTerminados);
    private movimientosServicio = new MovimientosServicio();

    async getAll(): Promise<ProductosTerminados[]> {
        return await this.repo.find();
    }

    async getById(id_producto_terminado: number): Promise<ProductosTerminados | null> {
        return await this.repo.findOneBy({ id_producto_terminado: id_producto_terminado });
    }
    //registrar producto terminado que todavia no sale  
    async create(dto: CrearProductoTerminadoDto, id_usuario?: number): Promise<ProductosTerminados> {
        const nuevo = this.repo.create(dto);
        const producto = await this.repo.save(nuevo);

        await this.movimientosServicio.registrar({
            tipo_movimiento: "registro_producto_terminado",
            cantidad: dto.stock_actual ?? 0,
            id_producto_terminado: producto.id_producto_terminado,
            id_usuario,
        });
        return producto;
    }

    async update(id_producto_terminado: number, dto: ActualizarProductoDto): Promise<ProductosTerminados | null> {
        const producto = await this.repo.findOneBy({ id_producto_terminado: id_producto_terminado });
        if (!producto) return null;

        this.repo.merge(producto, dto);
        return await this.repo.save(producto);
    }

    async delete(id_producto_terminado: number): Promise<boolean> {
        const resultado = await this.repo.delete(id_producto_terminado);
        return resultado.affected !== 0;
    }
    //registrar producto terminado que ya sale
}