import { AppDataSource } from "../bd/data-source";
import { MateriaPrima } from "../entities/materiaprima.entity";
import { CrearMateriaPrimaDto } from "../dtos/create.materiaprima.dto";
import { ActualizarMateriaPrimaDto } from "../dtos/update.materiaprima.dto";
import { MovimientosServicio } from "./movimientos.servicio";

export class MateriaPrimaServicio {
  private repo = AppDataSource.getRepository(MateriaPrima);
  private movimientosServicio = new MovimientosServicio();
  constructor() {
    this.repo = AppDataSource.getRepository(MateriaPrima);
  }
  async getAll(): Promise<MateriaPrima[]> {
    return await this.repo.find();
  }
  async getById(id_materia_prima: number): Promise<MateriaPrima | null> {
    return await this.repo.findOneBy({ id_materia_prima });
  }
  async create(dto: CrearMateriaPrimaDto, id_usuario?: number): Promise<MateriaPrima> {
    const nueva = this.repo.create(dto);
    const materia = await this.repo.save(nueva);

    //registrar movimiento de entrada 
    await this.movimientosServicio.registrar({
      tipo_movimiento: "entrada_materia",
      cantidad: dto.stock_actual ?? 0,
      id_materia_prima: materia.id_materia_prima,
      id_usuario,
    });

    return materia;
  }
  async update(id_materia_prima: number, dto: ActualizarMateriaPrimaDto, id_usuario?: number): Promise<MateriaPrima | null> {
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

    return actualizada;
  }
  async delete(id_materia_prima: number, id_usuario?: number): Promise<boolean> {
    const resultado = await this.repo.delete(id_materia_prima);
    const eliminada = resultado.affected !== 0;

    if (eliminada) {
      await this.movimientosServicio.registrar({
        tipo_movimiento: "eliminacion",
        cantidad: 0,
        id_materia_prima,
        id_usuario,
      });
    }

    return eliminada;
  }
}
