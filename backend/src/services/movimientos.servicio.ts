import { AppDataSource } from "../bd/data-source";
import { Movimientos } from "../entities/movimientos.entity";
import { MateriaPrima } from "../entities/materiaprima.entity";
import { ProductosTerminados } from "../entities/productosterminados.entity";
import { Usuario } from "../entities/usuario.entity";
import { MovimientosInventarioDto } from "../dtos/movimientos.dto";

export class MovimientosServicio{
    private repo = AppDataSource.getRepository(Movimientos);
    private repoMateria = AppDataSource.getRepository(MateriaPrima);
    private repoProductosT = AppDataSource.getRepository(ProductosTerminados);
    private repoUsr = AppDataSource.getRepository(Usuario)

    //registrar movimiento
    async registrar(data:MovimientosInventarioDto):Promise<Movimientos>{
        const movimiento = new Movimientos();

        movimiento.tipo_movimiento = data.tipo_movimiento;
        movimiento.cantidad = data.cantidad;

        //entidades si tienen id
        if(data.id_materia_prima){
            movimiento.materiaPrima = await this.repoMateria.findOneBy({id_materia_prima: data.id_materia_prima});
        }
        if(data.id_producto_terminado){
            movimiento.productosTerminados = await this.repoProductosT.findOneBy({id_producto_terminado: data.id_producto_terminado});
        }
        if(data.id_usuario){
            movimiento.usuario = await this.repoUsr.findOneBy({id_usuario: data.id_usuario});
        }
        return this.repo.save(movimiento);
    }
    //todos los movimientos 
    async movimientos(): Promise<Movimientos[]>{
        return this.repo.find({
            relations: ["usuario", "materiaPrima", "productosTerminados"],
            order: {fecha_movimiento: "DESC"}
        });
    }
}