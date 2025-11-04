import { AppDataSource } from "../bd/data-source";
import { ProductosTerminados } from "../entities/productosterminados.entity";
import { CrearProductoTerminadoDto } from "../dtos/create.productoterminado.dto";
import { ActualizarProductoDto } from "../dtos/update.producto.dto";
import { MovimientosServicio } from "./movimientos.servicio";
import { AlertasServicio } from "./alertastock.servicio";

type RespuestaProducto = {
    mensaje: string;
    producto: ProductosTerminados;
    alerta: string | null;
};

export class ProductoTerminadoServicio {
    private repo = AppDataSource.getRepository(ProductosTerminados);
    private movimientosServicio = new MovimientosServicio();
    private alertaServicio = new AlertasServicio();

    async getAll(): Promise<ProductosTerminados[]> {
        return await this.repo.find();
    }

    async getById(id_producto_terminado: number): Promise<ProductosTerminados | null> {
        return await this.repo.findOneBy({ id_producto_terminado });
    }
    //registrar producto que no sale todavia
    async create(dto: CrearProductoTerminadoDto, id_usuario?: number): Promise<RespuestaProducto> {
        const nuevo = this.repo.create(dto);
        const producto = await this.repo.save(nuevo);

        await this.movimientosServicio.registrar({
            tipo_movimiento: "registro_producto_terminado",
            cantidad: dto.stock_actual ?? 0,
            id_producto_terminado: producto.id_producto_terminado,
            id_usuario,
        });

        const alerta = await this.alertaServicio.revisarStockProducto(producto.id_producto_terminado);

        return {
            mensaje: "Producto registrado correctamente",
            producto,
            alerta: alerta ? alerta.mensaje : null,
        };
    }
    //actualizar
    async update(id_producto_terminado: number, dto: ActualizarProductoDto, id_usuario?: number): Promise<RespuestaProducto | null> {
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

        const alerta = await this.alertaServicio.revisarStockProducto(producto.id_producto_terminado);

        return {
            mensaje: "Producto actualizado de forma correcta",
            producto: actualizada,
            alerta: alerta ? alerta.mensaje : null,
        };
    }
    //desactivar
    async desactivar(id_producto_terminado: number, id_usuario?: number): Promise<RespuestaProducto | null> {
        const producto = await this.repo.findOneBy({ id_producto_terminado });
        if (!producto) return null;

        producto.activo = false;
        await this.repo.save(producto);

        await this.movimientosServicio.registrar({
            tipo_movimiento: "desactivacion",
            cantidad: 0,
            id_producto_terminado,
            id_usuario,
        });

        const alerta = await this.alertaServicio.revisarStockProducto(producto.id_producto_terminado);

        return {
            mensaje: "Producto desactivado correctamente",
            producto,
            alerta: alerta ? alerta.mensaje : null,
        };
    }
    //registrar producto que ya sale
    async registrarSalida(id_producto_terminado: number, cantidad: number, id_usuario?: number): Promise<RespuestaProducto | null> {
        const producto = await this.repo.findOneBy({ id_producto_terminado });
        if (!producto) return null;

        if (producto.stock_actual < cantidad) {
            throw new Error("No hay suficiente stock para la salida de este producto");
        }

        producto.stock_actual -= cantidad;
        await this.repo.save(producto);

        await this.movimientosServicio.registrar({
            tipo_movimiento: "salida_producto_terminado",
            cantidad,
            id_producto_terminado,
            id_usuario,
        });

        const alerta = await this.alertaServicio.revisarStockProducto(producto.id_producto_terminado);

        return {
            mensaje: "Salida registrada correctamente",
            producto,
            alerta: alerta ? alerta.mensaje : null,
        };
    }
}
