import { AppDataSource } from "../bd/data-source";
import { MateriaPrima } from "../entities/materiaprima.entity";
import { CrearMateriaPrimaDto } from "../dtos/create.materiaprima.dto";
import { ActualizarMateriaPrimaDto } from "../dtos/update.materiaprima.dto";

export class MateriaPrimaServicio{
     private repo = AppDataSource.getRepository(MateriaPrima);

  constructor() {
    this.repo = AppDataSource.getRepository(MateriaPrima);
  }

  async getAll(): Promise<MateriaPrima[]> {
    return await this.repo.find();
  }

  async getById(id_materia_prima: number): Promise<MateriaPrima | null> {
    return await this.repo.findOneBy({ id_materia_prima: id_materia_prima });
  }

  async create(dto: CrearMateriaPrimaDto): Promise<MateriaPrima> {
    const nueva = this.repo.create(dto); 
    return await this.repo.save(nueva);
  }

  async update(id_materia_prima: number, dto: ActualizarMateriaPrimaDto): Promise<MateriaPrima | null> {
    const materia = await this.repo.findOneBy({ id_materia_prima: id_materia_prima});
    if (!materia) return null;

    this.repo.merge(materia, dto); 
    return await this.repo.save(materia);
  }

  async delete(id_materia_prima: number): Promise<boolean> {
    const resultado = await this.repo.delete(id_materia_prima);
    return resultado.affected !== 0;
  }
}