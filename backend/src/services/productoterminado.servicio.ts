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

    async update(id_producto_terminado: number, dto: ActualizarProductoDto, id_usuario?: number): Promise<ProductosTerminados | null> {
        const producto = await this.repo.findOneBy({ id_producto_terminado });
        if (!producto) return null;

        this.repo.merge(producto, dto);
        const actualizada = await this.repo.save(producto);

        await this.movimientosServicio.registrar({
            tipo_movimiento: "actualizacion",
            cantidad: 0,
            id_producto_terminado,
            id_usuario,
        });

        return actualizada;
    }

    async desactivar(id_producto_terminado: number, id_usuario?: number): Promise<boolean> {
        const producto = await this.repo.findOneBy({ id_producto_terminado });
        if (!producto) return false;

        producto.activo = false;
        await this.repo.save(producto);

        await this.movimientosServicio.registrar({
            tipo_movimiento: "desactivacion",
            cantidad: 0,
            id_producto_terminado,
            id_usuario,
        });
        return true;
    }
    //registrar producto terminado que ya sale
    async registrarSalida(
        id_producto_terminado: number,
        cantidad: number,
        id_usuario?: number
    ): Promise<ProductosTerminados | null> {
        const producto = await this.repo.findOneBy({ id_producto_terminado });
        if (!producto) return null;

        if (producto.stock_actual < cantidad) {
            throw new Error("No hay stock para que pueda salir el producto");
        }
        producto.stock_actual -= cantidad;
        await this.repo.save(producto);

        await this.movimientosServicio.registrar({
            tipo_movimiento: "salida_producto_terminado",
            cantidad,
            id_producto_terminado,
            id_usuario,
        });

        return producto;
    }
}