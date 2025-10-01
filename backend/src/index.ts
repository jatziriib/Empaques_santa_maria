import "reflect-metadata"; 
import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();        

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Back funcionandooo :)" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
