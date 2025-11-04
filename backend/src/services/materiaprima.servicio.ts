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

  constructor() {
    this.repo = AppDataSource.getRepository(MateriaPrima);
  }
  /*async getAll(): Promise<MateriaPrima[]> {
    return await this.repo.find();
  }*/

  //solo activos
  async getAll(): Promise<MateriaPrima[]> {
    return await this.repo.find({ where: { activo: true } });
  }

  async getById(id_materia_prima: number): Promise<MateriaPrima | null> {
    return await this.repo.findOneBy({ id_materia_prima });
  }

  //registrar material
  async create(dto: CrearMateriaPrimaDto, id_usuario?: number): Promise<RespuestaMateria> {
    const nuevo = this.repo.create(dto);
    const materia = await this.repo.save(nuevo);

    await this.movimientosServicio.registrar({
      tipo_movimiento: "entrada_materia",
      cantidad: dto.stock_actual ?? 0,
      id_materia_prima: materia.id_materia_prima,
      id_usuario,
    });

    const alerta = await this.alertaServicio.revisarStockMateria(materia.id_materia_prima);

    return {
      mensaje: "materia registrada correctamente",
      materia,
      alerta: alerta ? alerta.mensaje : null,
    };
  }
  //Actualizar
  async update(id_materia_prima: number, dto: ActualizarMateriaPrimaDto, id_usuario?: number): Promise<RespuestaMateria | null> {
    const materia = await this.repo.findOneBy({ id_materia_prima });
    if (!materia) return null;

    this.repo.merge(materia, dto);
    const actualizada = await this.repo.save(materia);

    await this.movimientosServicio.registrar({
      tipo_movimiento: "actualizacion",
      cantidad: 0,
      id_materia_prima,
      id_usuario,
    });

    const alerta = await this.alertaServicio.revisarStockMateria(materia.id_materia_prima);

    return {
      mensaje: "materia actualizada de forma correcta",
      materia: actualizada,
      alerta: alerta ? alerta.mensaje : null,
    };
  }

  //desactivar material
  async desactivar(id_materia_prima: number, id_usuario?: number): Promise<RespuestaMateria | null> {
    const materia = await this.repo.findOneBy({ id_materia_prima });
    if (!materia) return null;

    materia.activo = false;
    await this.repo.save(materia);

    await this.movimientosServicio.registrar({
      tipo_movimiento: "desactivacion",
      cantidad: 0,
      id_materia_prima,
      id_usuario,
    });

    const alerta = await this.alertaServicio.revisarStockMateria(materia.id_materia_prima);

    return {
      mensaje: "materia desactivada correctamente",
      materia,
      alerta: alerta ? alerta.mensaje : null,
    };
  }
}
