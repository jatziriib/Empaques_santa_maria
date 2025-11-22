import { AppDataSource } from "../bd/data-source";
import { MateriaPrima } from "../entities/materiaprima.entity";
import { CrearMateriaPrimaDto } from "../dtos/create.materiaprima.dto";
import { ActualizarMateriaPrimaDto } from "../dtos/update.materiaprima.dto";
import { MovimientosServicio } from "./movimientos.servicio";
import { AlertasServicio } from "./alertastock.servicio";

type RespuestaMateria = {
  mensaje: string;
  materia: MateriaPrima;
  alerta: string | null;
};

export class MateriaPrimaServicio {
  private repo = AppDataSource.getRepository(MateriaPrima);
  private movimientosServicio = new MovimientosServicio();
  private alertaServicio = new AlertasServicio();

  constructor(
    repo = AppDataSource.getRepository(MateriaPrima),
    movimientosServicio = new MovimientosServicio(),
    alertaServicio = new AlertasServicio()
  ) {
    this.repo = repo;
    this.movimientosServicio = movimientosServicio;
    this.alertaServicio = alertaServicio;
  }

  async getAll(): Promise<MateriaPrima[]> {
    return await this.repo.find();
  }

  async getById(id_materia_prima: number): Promise<MateriaPrima | null> {
    return await this.repo.findOneBy({ id_materia_prima });
  }

  //create materia prima
  async create(dto: CrearMateriaPrimaDto, id_usuario?: number): Promise<RespuestaMateria> {
    const nueva = this.repo.create(dto);
    const materia = await this.repo.save(nueva);

    //registrar movimiento de entrada si stock actual > 0
    if ((dto.stock_actual ?? 0) > 0) {
      await this.registrarMovimiento(
        materia.id_materia_prima,
        "entrada_materia",
        dto.stock_actual ?? 0,
        id_usuario
      );
    }

    //revisar alerta
    const alerta = await this.alertaServicio.revisarStockMateria(materia.id_materia_prima);

    return {
      mensaje: "Materia prima registrada correctamente",
      materia,
      alerta: alerta?.mensaje ?? null,
    };
  }

  //actualizar materia prima
  async update(
    id_materia_prima: number,
    dto: ActualizarMateriaPrimaDto,
    id_usuario?: number
  ): Promise<RespuestaMateria | null> {
    const materia = await this.repo.findOneBy({ id_materia_prima });
    if (!materia) return null;

    const stockAnterior = Number(materia.stock_actual ?? 0);

    //sumar o restar si en stock viene operacion y cantidad
    if (dto.operacion && dto.cantidad !== undefined) {
      const cantidadNum = Number(dto.cantidad);
      if (isNaN(cantidadNum) || cantidadNum <= 0) throw new Error("Cantidad invalida");

      if (dto.operacion === "sumar") materia.stock_actual = stockAnterior + cantidadNum;
      else if (dto.operacion === "restar") {
        materia.stock_actual = stockAnterior - cantidadNum;
        if (materia.stock_actual < 0) throw new Error("El stock no puede quedar en negativo");
      } else throw new Error("Operacion invalida. Se debe usar 'sumar' o 'restar'.");
    }

    //merge de los otros campos
    const { operacion, cantidad, ...otros } = dto as any;
    this.repo.merge(materia, otros);

    const actualizada = await this.repo.save(materia);

    //registrar movimiento si hubo cambio en stock
    const diferencia = Number(actualizada.stock_actual) - stockAnterior;
    if (diferencia !== 0) {
      await this.movimientosServicio.registrar({
        tipo_movimiento: "actualizacion",
        cantidad: diferencia,
        id_materia_prima,
        id_usuario,
      });
    }

    //revisar alerta
    const alerta = await this.alertaServicio.revisarStockMateria(actualizada.id_materia_prima);

    return {
      mensaje: "Materia prima actualizada correctamente",
      materia: actualizada,
      alerta: alerta?.mensaje ?? null,
    };
  }

  //desactivar materia prima
  async desactivar(id_materia_prima: number, id_usuario?: number): Promise<RespuestaMateria | null> {
    const materia = await this.repo.findOneBy({ id_materia_prima });
    if (!materia) return null;

    const cantidadARestar = Number(materia.stock_actual ?? 0);

    materia.activo = false;
    materia.stock_actual = 0;
    const actualizada = await this.repo.save(materia);

    //registrar movimiento poniendo el stock que se desactiva
    if (cantidadARestar > 0) {
      await this.movimientosServicio.registrar({
        tipo_movimiento: "desactivacion",
        cantidad: -cantidadARestar,
        id_materia_prima,
        id_usuario,
      });
    }

    //revisar alerta
    const alerta = await this.alertaServicio.revisarStockMateria(actualizada.id_materia_prima);

    return {
      mensaje: "Materia prima desactivada correctamente",
      materia: actualizada,
      alerta: alerta?.mensaje ?? null,
    };
  }

  //registrar movimiento en general
  async registrarMovimiento(
    id_materia_prima: number,
    tipo: string,
    cantidad: number,
    id_usuario?: number
  ) {
    const materia = await this.repo.findOneBy({ id_materia_prima });
    if (!materia) throw new Error("Materia prima no encontrada");

    if (tipo === "entrada_materia") {
      materia.stock_actual = Number(materia.stock_actual ?? 0) + Number(cantidad ?? 0);
      await this.repo.save(materia);
    }

    const movimiento = await this.movimientosServicio.registrar({
      tipo_movimiento: tipo,
      cantidad,
      id_materia_prima,
      id_usuario,
    });

    //revisar alerta
    const alerta = await this.alertaServicio.revisarStockMateria(id_materia_prima);

    return { movimiento, alerta: alerta?.mensaje ?? null };
  }
}
