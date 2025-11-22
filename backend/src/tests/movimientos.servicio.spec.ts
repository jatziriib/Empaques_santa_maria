import { MovimientosServicio } from "../services/movimientos.servicio";
import { AlertasServicio } from "../services/alertastock.servicio";
import nodemailer from "nodemailer";

jest.mock("nodemailer");

describe("Movimientos Servicio", () => {
  let servicio: MovimientosServicio;
  let mockRepo: any;
  let mockRepoMateria: any;
  let mockRepoProducto: any;
  let mockRepoUsr: any;
  let mockAlertas: any;
  let sendMailMock: jest.Mock;

  beforeEach(() => {
    servicio = new MovimientosServicio();

    // Mocks de repositorios
    mockRepo = { save: jest.fn(), findOne: jest.fn(), find: jest.fn() };
    mockRepoMateria = { findOneBy: jest.fn(), save: jest.fn() };
    mockRepoProducto = { findOneBy: jest.fn(), save: jest.fn() };
    mockRepoUsr = { findOneBy: jest.fn(), find: jest.fn() };
    mockAlertas = { revisarStockProducto: jest.fn(), revisarStockMateria: jest.fn() };

    //servicios
    (servicio as any).repo = mockRepo;
    (servicio as any).repoMateria = mockRepoMateria;
    (servicio as any).repoProductosT = mockRepoProducto;
    (servicio as any).repoUsr = mockRepoUsr;
    (servicio as any).alertaServicio = mockAlertas;

    //nodemailer mock
    sendMailMock = jest.fn().mockResolvedValue(true);
    (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail: sendMailMock });

    jest.clearAllMocks();
  });

  it("Debe registrar un movimiento de devolucion con materia prima y enviar correo al encargado de las compras", async () => {
    const dto = {
      tipo_movimiento: "devolucion",
      cantidad: 5,
      id_materia_prima: 1,
      id_usuario: 1
    };

    const materiaMock = { id_materia_prima: 1, stock_actual: 10 };
    const usuarioMock = { id_usuario: 1, nombre: "Juan", rol: { nombre: "encargadocompras" }, correo: "correo@test.com" };

    mockRepoMateria.findOneBy.mockResolvedValue(materiaMock);
    mockRepoUsr.findOneBy.mockResolvedValue(usuarioMock);
    mockRepoUsr.find.mockResolvedValue([usuarioMock]);
    mockRepo.save.mockResolvedValue({ ...dto });

    const resultado = await servicio.registrar(dto);

    expect(mockRepoMateria.findOneBy).toHaveBeenCalledWith({ id_materia_prima: 1 });
    expect(mockRepoMateria.save).toHaveBeenCalledWith({ ...materiaMock, stock_actual: 15 });
    expect(sendMailMock).toHaveBeenCalled();
    expect(resultado).toEqual({ ...dto });
  });

  it("ctualizar un movimiento y checar alerta", async () => {
    const movimientoMock = { id_movimiento: 1, tipo_movimiento: "entrada", cantidad: 10, productosTerminados: { id_producto_terminado: 2 } };
    const updatedMovimiento = { ...movimientoMock, tipo_movimiento: "salida", cantidad: 5 };

    mockRepo.findOne.mockResolvedValue(movimientoMock);
    mockRepo.save.mockResolvedValue(updatedMovimiento);
    mockAlertas.revisarStockProducto.mockResolvedValue({ tipo: "stock_bajo_producto" });

    const resultado = await servicio.actualizar(1, { tipo_movimiento: "salida", cantidad: 5 });

    expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id_movimiento: 1 }, relations: ["materiaPrima", "productosTerminados"] });
    expect(mockRepo.save).toHaveBeenCalledWith(updatedMovimiento);
    expect(resultado).toEqual({
      mensaje: "Movimiento actualizado correctamente",
      movimiento: updatedMovimiento,
      alerta: { tipo: "stock_bajo_producto" },
    });
  });

  it("Devolver todos los movimientos", async () => {
    const movimientosMock = [{ id_movimiento: 1 }, { id_movimiento: 2 }];
    mockRepo.find.mockResolvedValue(movimientosMock);

    const resultado = await servicio.movimientos();

    expect(mockRepo.find).toHaveBeenCalledWith({
      relations: ["usuario", "materiaPrima", "productosTerminados"],
      order: { fecha_movimiento: "DESC" }
    });
    expect(resultado).toEqual(movimientosMock);
  });
});
