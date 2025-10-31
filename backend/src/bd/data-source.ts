import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Usuario } from '../entities/usuario.entity';
import { Rol } from '../entities/rol.entity';
import { Movimientos } from '../entities/movimientos.entity';
import { MateriaPrima } from '../entities/materiaprima.entity';
import { ProductosTerminados } from '../entities/productosterminados.entity';



dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Usuario, Rol, Movimientos, MateriaPrima, ProductosTerminados]
});