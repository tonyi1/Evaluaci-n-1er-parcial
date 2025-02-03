import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import usuariosRutas from "./routes/usuariosRutas.js";
import { conectarDB } from "./db/DB.js";

async function conexionDB() {
    var mensajeDB = await conectarDB();
    console.log(mensajeDB);
}

const app = express();
conexionDB();
// Uso correcto de los middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api",usuariosRutas);
// Configuración del puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
