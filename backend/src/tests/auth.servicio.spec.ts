import { AuthServicio } from "../services/auth.servicio";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("nodemailer");

describe("AuthServicio", () => {
  let servicio: AuthServicio;
  let mockUsrRepo: any;
  let mockRolRepo: any;
  let mockTransport: any;

  beforeEach(() => {
    //mock del repo
    mockUsrRepo = {
      findOneBy: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    mockRolRepo = { findOneBy: jest.fn() };

    //servicios y repos 
    servicio = new AuthServicio();
    (servicio as any).usrRepositorio = mockUsrRepo;
    (servicio as any).rolRepositorio = mockRolRepo;

    //mock de nodemailer
    mockTransport = { sendMail: jest.fn().mockResolvedValue(true) };
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransport);

    jest.clearAllMocks();
  });

  it("Se registra un usuario correctamente", async () => {
  mockUsrRepo.findOneBy.mockResolvedValue(null);
  mockRolRepo.findOneBy.mockResolvedValue({ id_rol: 1, nombre: "admin" });
  (bcrypt.hash as jest.Mock).mockResolvedValue("12345678hash");
  const usuarioMock = { id_usuario: 1, nombre: "Lluvia CG", correo: "lluviacg@gmail.com" };
  mockUsrRepo.create.mockReturnValue(usuarioMock);
  mockUsrRepo.save.mockResolvedValue(usuarioMock);

  const resultado = await servicio.registrar({
    nombre: "Lluvia CG",
    apellidos: "Cisneros Garay",
    correo: "lluviacg@gmail.com",
    contrasena: "12345678",
    rol: "admin",
  });

  expect(mockUsrRepo.findOneBy).toHaveBeenCalledWith({ correo: "lluviacg@gmail.com" });
  expect(mockRolRepo.findOneBy).toHaveBeenCalledWith({ nombre: "admin" });
  expect(bcrypt.hash).toHaveBeenCalledWith("12345678", 10);
  expect(mockUsrRepo.create).toHaveBeenCalled();
  expect(mockUsrRepo.save).toHaveBeenCalledWith(usuarioMock);
  expect(resultado).toEqual(usuarioMock);
});

it("se restablece la contraseña correctamente", async () => {
  const usuarioMock = { id_usuario: 1, nombre: "Lluvia CG", correo: "lluviacg@gmail.com", contrasena: "contrasena" };
  mockUsrRepo.findOneBy.mockResolvedValue(usuarioMock);
  (bcrypt.hash as jest.Mock).mockResolvedValue("12345678hash");
  mockUsrRepo.save.mockResolvedValue({ ...usuarioMock, contrasena: "12345678hash" });

  const resultado = await servicio.restablecerContrasena("lluviacg@gmail.com", "12345678");

  expect(mockUsrRepo.findOneBy).toHaveBeenCalledWith({ correo: "lluviacg@gmail.com" });
  expect(bcrypt.hash).toHaveBeenCalledWith("12345678", 10);
  expect(mockUsrRepo.save).toHaveBeenCalledWith({ ...usuarioMock, contrasena: "12345678hash" });
  expect(resultado).toHaveProperty("contrasena", "12345678hash");
});

});
