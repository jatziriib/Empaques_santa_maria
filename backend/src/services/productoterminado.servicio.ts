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
  constructor(
    public repo = AppDataSource.getRepository(ProductosTerminados),
    public movimientosServicio = new MovimientosServicio(),
    public alertaServicio = new AlertasServicio()
  ) { }

  async getAll(): Promise<ProductosTerminados[]> {
    return await this.repo.find();
  }

  async getById(id_producto_terminado: number): Promise<ProductosTerminados | null> {
    return await this.repo.findOneBy({ id_producto_terminado });
  }

  //Create de producto terminado, nadamas se registra 
  async create(dto: CrearProductoTerminadoDto, id_usuario?: number): Promise<RespuestaProducto> {
    const nueva = this.repo.create(dto);
    const producto = await this.repo.save(nueva);

    //revisar la alerta del stock minimo
    const alerta = await this.alertaServicio.revisarStockProducto(producto.id_producto_terminado);

    return {
      mensaje: "Producto registrado correctamente",
      producto,
      alerta: alerta ? alerta.mensaje : null,
    };
  }
  //registrar salida de producto y se resta el stock
  async registrarSalida(id_producto_terminado: number, cantidad: number, id_usuario?: number) {
    const producto = await this.repo.findOneBy({ id_producto_terminado });
    if (!producto) throw new Error("Producto no encontrado");

    cantidad = Number(cantidad);
    producto.stock_actual = Number(producto.stock_actual);

    if (cantidad > producto.stock_actual) throw new Error("Stock insuficiente");

    producto.stock_actual -= cantidad;
    await this.repo.save(producto);

    const movimiento = await this.movimientosServicio.registrar({
      tipo_movimiento: "salida_producto_terminado",
      cantidad,
      id_producto_terminado,
      id_usuario,
    });

    const alerta = await this.alertaServicio.revisarStockProducto(id_producto_terminado);

    return { movimiento, alerta: alerta ? alerta.mensaje : null };
  }

  //actualizar producto
  async update(
    id_producto_terminado: number,
    dto: ActualizarProductoDto,
    id_usuario?: number
  ): Promise<RespuestaProducto | null> {

    const producto = await this.repo.findOneBy({ id_producto_terminado });
    if (!producto) return null;

    const stockAnterior = Number(producto.stock_actual ?? 0);

    //Aqui si se pone sumar o restar y cantidad se hace la operacion
    if (dto.operacion && dto.cantidad !== undefined) {
      const cantidad = Number(dto.cantidad);
      if (isNaN(cantidad) || cantidad <= 0) throw new Error("Cantidad invalida");

      const stockActual = Number(producto.stock_actual ?? 0);

      if (dto.operacion === "sumar") {
        producto.stock_actual = stockActual + cantidad;
      } else if (dto.operacion === "restar") {
        producto.stock_actual = stockActual - cantidad;
        if (producto.stock_actual < 0) throw new Error("El stock no puede quedar en negativo");
      } else {
        throw new Error("Operacion no valida. Se debe usar sumar' o 'restar'.");
      }
    }

    
    //merge de los otros ampos sin tocar mi stock actual
    const { operacion, cantidad, ...otros } = dto as any;
    this.repo.merge(producto, otros);

    const actualizada = await this.repo.save(producto);
    //registrar el movimiento si hubo cambio en el stock
    const diferencia = Number(actualizada.stock_actual) - stockAnterior;
    if (diferencia !== 0 && id_usuario) {
      await this.movimientosServicio.registrar({
        tipo_movimiento: "actualizacion",
        cantidad: diferencia,
        id_producto_terminado,
        id_usuario,
      });
    }

    //revisar alerta
    const alerta = await this.alertaServicio.revisarStockProducto(id_producto_terminado);

    return {
      mensaje: "Producto actualizado correctamente",
      producto: actualizada,
      alerta: alerta ? alerta.mensaje : null,
    };
  }

  //desactivar producto terminado
  async desactivar(id_producto_terminado: number, id_usuario?: number): Promise<RespuestaProducto | null> {
    const producto = await this.repo.findOneBy({ id_producto_terminado });
    if (!producto) return null;

    const cantidadARestar = Number(producto.stock_actual);

    producto.activo = false;
    producto.stock_actual = 0;
    const actualizada = await this.repo.save(producto);

    if (cantidadARestar > 0) {
      await this.movimientosServicio.registrar({
        tipo_movimiento: "desactivacion",
        cantidad: -cantidadARestar,
        id_producto_terminado,
        id_usuario,
      });
    }

    const alerta = await this.alertaServicio.revisarStockProducto(id_producto_terminado);

    return {
      mensaje: "Producto desactivado correctamente",
      producto: actualizada,
      alerta: alerta ? alerta.mensaje : null,
    };
  }

}
