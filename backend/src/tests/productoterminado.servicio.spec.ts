import { ProductoTerminadoServicio } from "../services/productoterminado.servicio";
import { CrearProductoTerminadoDto } from "../dtos/create.productoterminado.dto";
import { ActualizarProductoDto } from "../dtos/update.producto.dto";

describe("Servicio de Producto Terminado", () => {
  let servicio: ProductoTerminadoServicio;
  let mockRepo: any;
  let mockMovimientos: any;
  let mockAlertas: any;

  beforeEach(() => {
    mockRepo = { create: jest.fn(), save: jest.fn(), findOneBy: jest.fn(), merge: jest.fn() };
    mockMovimientos = { registrar: jest.fn().mockResolvedValue(true) };
    mockAlertas = { revisarStockProducto: jest.fn().mockResolvedValue(null) };
    servicio = new ProductoTerminadoServicio(mockRepo, mockMovimientos, mockAlertas);
  });

  it("Debe crear un producto terminado correctamente", async () => {
    const dto: CrearProductoTerminadoDto = {
      tarima: "Tarima 50x100",
      stock_actual: 50,
      stock_minimo: 10
    };

    const productoMock = { id_producto_terminado: 1, ...dto };
    mockRepo.create.mockReturnValue(productoMock);
    mockRepo.save.mockResolvedValue(productoMock);

    const resultado = await servicio.create(dto, 1);

    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(mockRepo.save).toHaveBeenCalledWith(productoMock);
    expect(resultado.producto).toEqual(productoMock);
    expect(resultado.producto.stock_minimo).toBe(10);//es el que esta bien
    expect(resultado.mensaje).toBe("Producto registrado correctamente");
  });

  it("Debe actualizar el producto y registrar el movimiento si stock cambia", async () => {
    const dto: ActualizarProductoDto = {
      tarima: "Tarima 55x100",
      operacion: "sumar",
      cantidad: 20
    };

    const producto = { id_producto_terminado: 1, tarima: "Tarima 50x100", stock_actual: 10, stock_minimo: 10, activo: true };
    mockRepo.findOneBy.mockResolvedValue(producto);
    mockRepo.save.mockResolvedValue({ ...producto, tarima: "Tarima 55x100", stock_actual: 30 });

    const resultado = await servicio.update(1, dto, 1);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id_producto_terminado: 1 });
    expect(mockRepo.save).toHaveBeenCalled();
    expect(mockMovimientos.registrar).toHaveBeenCalledWith({
      tipo_movimiento: "actualizacion",
      cantidad: 20,
      id_producto_terminado: 1,
      id_usuario: 1
    });
    expect(resultado?.producto.stock_actual).toBe(30);
    expect(resultado?.producto.tarima).toBe("Tarima 55x100");
    expect(resultado?.producto.stock_minimo).toBe(10); //stock_minimo original
  });

  it("Devolver null al actualizar producto que ni existe", async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    const resultado = await servicio.update(999, { tarima: "Tarima 50x100", operacion: "sumar", cantidad: 10 });
    expect(resultado).toBeNull();
  });

  it("Desactivar un producto que existe y registrar movimiento de desactivacion", async () => {
    const producto = { id_producto_terminado: 1, activo: true, stock_actual: 15, stock_minimo: 10 };
    mockRepo.findOneBy.mockResolvedValue(producto);
    mockRepo.save.mockResolvedValue({ ...producto, activo: false, stock_actual: 0 });

    const resultado = await servicio.desactivar(1, 1);

    expect(mockRepo.save).toHaveBeenCalled();
    expect(mockMovimientos.registrar).toHaveBeenCalledWith({
      tipo_movimiento: "desactivacion",
      cantidad: -15,
      id_producto_terminado: 1,
      id_usuario: 1
    });
    expect(resultado?.producto.activo).toBe(false);
    expect(resultado?.producto.stock_actual).toBe(0);
    expect(resultado?.producto.stock_minimo).toBe(10); 
  });

  it("Debe devolver null al cuando se desactiva un producto que no existe", async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    const resultado = await servicio.desactivar(999, 1);
    expect(resultado).toBeNull();
  });
});
