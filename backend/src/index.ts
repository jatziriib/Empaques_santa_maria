import express from "express";
import "reflect-metadata";
import cors from "cors";
import { AppDataSource } from "./bd/data-source";
import "dotenv/config";
import rutasUsuario from "./routes/rutas.usuario";
import rutasAuth from "./routes/rutas.auth";
import rutasMateriaPrima from "./routes/rutas.materiaprima";
import rutasProductoTerminado from "./routes/rutas.productoterminado";
import rutasMovimientos from "./routes/rutas.movimientos";



const app = express();
app.use(cors({
  origin:"*",
  methods:["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/usuarios", rutasUsuario)
app.use("/autenticacion", rutasAuth)
app.use("/materiaprima", rutasMateriaPrima)
app.use("/productoterminado", rutasProductoTerminado)
app.use("/movimientos", rutasMovimientos)

AppDataSource.initialize()
  .then(() => {
    console.log("BD conectada");
    app.listen(4000, () => console.log("Servidor en http://localhost:4000"));
  })
  .catch((error) => console.error(error));

