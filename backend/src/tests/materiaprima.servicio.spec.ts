import { MateriaPrimaServicio } from "../services/materiaprima.servicio";
import { CrearMateriaPrimaDto } from "../dtos/create.materiaprima.dto";
import { ActualizarMateriaPrimaDto } from "../dtos/update.materiaprima.dto";

describe("Servicio de Materia Prima", () => {
    let servicio: MateriaPrimaServicio;
    let mockRepo: any;
    let mockMovimientos: any;
    let mockAlertas: any;

    beforeEach(() => {
        mockRepo = {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            merge: jest.fn()
        };
        mockRepo.findOneBy.mockImplementation(({ id_materia_prima }) => {
            return { id_materia_prima, tipo: "Tabla", ancho: 30, largo: 60, stock_actual: 50, stock_minimo: 10 };
        });

        mockMovimientos = { registrar: jest.fn().mockResolvedValue(true) };
        mockAlertas = { revisarStockMateria: jest.fn().mockResolvedValue(null) };

        servicio = new MateriaPrimaServicio(mockRepo, mockMovimientos, mockAlertas);
    });
    it("Debe crear una materia prima y registrar movimiento de entrada", async () => {
        const dto: CrearMateriaPrimaDto = {
            tipo: "Tabla",
            ancho: 30,
            largo: 60,
            stock_actual: 50,
            stock_minimo: 10
        };

        const materiaMock = { id_materia_prima: 1, ...dto };
        mockRepo.create.mockReturnValue(materiaMock);
        mockRepo.save.mockResolvedValue(materiaMock);

        const resultado = await servicio.create(dto, 1);

        expect(mockRepo.create).toHaveBeenCalledWith(dto);
        expect(mockRepo.save).toHaveBeenCalledWith(materiaMock);
        expect((servicio as any).movimientosServicio.registrar).toHaveBeenCalledWith({
            tipo_movimiento: "entrada_materia",
            cantidad: 50,
            id_materia_prima: 1,
            id_usuario: 1,
        });
        expect(resultado.materia).toEqual(materiaMock);
    });

    it("Debe actualizar una materia prima que exista y registrar movimiento de actualizacion si cambia el stock", async () => {
        //DTO
        const dto: ActualizarMateriaPrimaDto = {
            tipo: "Tabla",
            ancho: 30,
            largo: 60,
            stock_minimo: 5,
            stock_actual: 20, //cambio de stock
        };

        const materia = {
            id_materia_prima: 1,
            tipo: "Tabla",
            ancho: 30,
            largo: 60,
            stock_minimo: 10,
            stock_actual: 10
        };

        mockRepo.findOneBy.mockResolvedValue(materia);
        mockRepo.save.mockResolvedValue({ ...materia, ...dto });

        const resultado = await servicio.update(1, dto, 1);

        expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id_materia_prima: 1 });
        expect(mockRepo.save).toHaveBeenCalled();
        expect((servicio as any).movimientosServicio.registrar).toHaveBeenCalledWith({
            tipo_movimiento: "actualizacion",
            cantidad: 10, // stock actual - stock de antes
            id_materia_prima: 1,
            id_usuario: 1,
        });
        expect(resultado?.materia.stock_minimo).toBe(5);
    });


    it("desactivar una materia prima que existe y registrar movimiento de desactivacion", async () => {
        const materia = { id_materia_prima: 1, activo: true, stock_actual: 20 };
        mockRepo.findOneBy.mockResolvedValue(materia);
        mockRepo.save.mockResolvedValue({ ...materia, activo: false, stock_actual: 0 });

        const resultado = await servicio.desactivar(1, 1);

        expect(mockRepo.save).toHaveBeenCalled();
        expect((servicio as any).movimientosServicio.registrar).toHaveBeenCalledWith({
            tipo_movimiento: "desactivacion",
            cantidad: -20,
            id_materia_prima: 1,
            id_usuario: 1,
        });
        expect(resultado?.materia.activo).toBe(false);
    });

    it("Debe devolver null si se quiere ctualizar una materiaque no existe", async () => {
        mockRepo.findOneBy.mockResolvedValue(null);
        const dto: ActualizarMateriaPrimaDto = { tipo: "Tabla", ancho: 30, largo: 60, stock_minimo: 5 };
        const resultado = await servicio.update(999, dto, 1);
        expect(resultado).toBeNull();
    });

    it("devolver null si se intenta desactivar una materia que no existe", async () => {
        mockRepo.findOneBy.mockResolvedValue(null);
        const resultado = await servicio.desactivar(999, 1);
        expect(resultado).toBeNull();
    });
});
