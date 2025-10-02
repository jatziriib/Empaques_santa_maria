import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./bd/data-source";
import "dotenv/config";
import rutasUsuario from "./routes/rutas.usuario";
import rutasAuth from "./routes/rutas.auth";


const app = express();
app.use(express.json());
app.use("/usuarios", rutasUsuario)
app.use("/autenticacion", rutasAuth)

AppDataSource.initialize()
  .then(() => {
    console.log("BD conectada");
    app.listen(4000, () => console.log("Servidor en http://localhost:4000"));
  })
  .catch((error) => console.error(error));

