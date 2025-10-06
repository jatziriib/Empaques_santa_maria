import { AppDataSource } from "../bd/data-source";
import { ProductosTerminados } from "../entities/productosterminados.entity";
import { CrearProductoTerminadoDto } from "../dtos/create.productoterminado.dto";
import { ActualizarProductoDto } from "../dtos/update.producto.dto";

export class ProductoTerminadoServicio{
    private repo = AppDataSource.getRepository(ProductosTerminados);

    
    async getAll(): Promise<ProductosTerminados[]> {
        return await this.repo.find();
    }

    async getById(id_producto_terminado:number): Promise<ProductosTerminados | null>{
        return await this.repo.findOneBy({id_producto_terminado: id_producto_terminado});
    }
    
    async create(dto: CrearProductoTerminadoDto): Promise<ProductosTerminados>{
        const nuevo = this.repo.create(dto);
        return await this.repo.save(nuevo);
    }

    async update(id_producto_terminado: number, dto: ActualizarProductoDto): Promise<ProductosTerminados | null>{
        const producto = await this.repo.findOneBy({id_producto_terminado: id_producto_terminado});
        if(!producto) return null;

        this.repo.merge(producto, dto);
        return await this.repo.save(producto);
    }

    async delete(id_producto_terminado: number): Promise<boolean>{
        const resultado = await this.repo.delete(id_producto_terminado);
        return resultado.affected !== 0;
    }



}