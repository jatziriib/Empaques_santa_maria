import { AlertasServicio } from "../services/alertastock.servicio";

describe("Alertas Stock Servicio", () => {
  let servicio: AlertasServicio;
  let mockRepoMateria: any;
  let mockRepoProducto: any;

  beforeEach(() => {
    mockRepoMateria = { findOneBy: jest.fn() };
    mockRepoProducto = { findOneBy: jest.fn() };
    servicio = new AlertasServicio();

    //mocks de los repos
    (servicio as any).repoMateria = mockRepoMateria;
    (servicio as any).repoProducto = mockRepoProducto;
  });

  it("Debe devolver una alerta cuando el stock de materia prima este bajo", async () => {
    mockRepoMateria.findOneBy.mockResolvedValue({ id_materia_prima: 1, stock_actual: 5, stock_minimo: 10 });

    const resultado = await servicio.revisarStockMateria(1);

    expect(resultado).toHaveProperty("tipo", "stock_bajo_materia");
    expect(resultado).toHaveProperty("mensaje");
  });

  it("Debe devolver null cuando el stock de la materia no esta bajo", async () => {
    mockRepoMateria.findOneBy.mockResolvedValue({ id_materia_prima: 1, stock_actual: 15, stock_minimo: 10 });

    const resultado = await servicio.revisarStockMateria(1);
    expect(resultado).toBeNull();
  });

  it("Devolver null si la materia no existe", async () => {
    mockRepoMateria.findOneBy.mockResolvedValue(null);

    const resultado = await servicio.revisarStockMateria(999);
    expect(resultado).toBeNull();
  });

  it("Devolver una alerta cuando el stock de producto terminado este bajo", async () => {
    mockRepoProducto.findOneBy.mockResolvedValue({ id_producto_terminado: 1, stock_actual: 3, stock_minimo: 5 });

    const resultado = await servicio.revisarStockProducto(1);
    expect(resultado).toHaveProperty("tipo", "stock_bajo_producto");
    expect(resultado).toHaveProperty("mensaje");
  });

  it("Devolver null cuando el stock de producto terminado esta bien", async () => {
    mockRepoProducto.findOneBy.mockResolvedValue({ id_producto_terminado: 1, stock_actual: 10, stock_minimo: 5 });

    const resultado = await servicio.revisarStockProducto(1);
    expect(resultado).toBeNull();
  });

  it("Debe devolver null si el producto no existe", async () => {
    mockRepoProducto.findOneBy.mockResolvedValue(null);

    const resultado = await servicio.revisarStockProducto(999);
    expect(resultado).toBeNull();
  });
});
