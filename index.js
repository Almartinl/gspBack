import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";
import db from "./services/mysql.js";
import userRouter from "./routes/user_router.js";
import productRouter from "./routes/product_router.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import configRouter from "./routes/config_router.js";
import bungalowsRouter from "./routes/bungalows_router.js";
import obrasRouter from "./routes/obras_router.js";

dotenv.config();

// Función para utilizar path en ES Modules (exportamos para utilizarla globalmente)
export function currentDir() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return { __dirname, __filename };
}

const { __dirname } = currentDir();

const app = express();

// middlware express
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// instanciamos la librería file upload y le añadimos propiedades.
app.use(
  fileUpload({
    createParentPath: true, // Crea la carpeta donde almacenamos las imágenes si no ha sido creada.
    limits: { fileSize: 20 * 1024 * 1024 }, // Limitamos el tamaño de la imagen a 20mb. Por defecto son 50mb.
    abortOnLimit: true, // Interrumpe la carga del archivo si supera el límite especificado.
    responseOnLimit: "Imagen demasiado grande", // Enviamos un mensaje de respuesta cuando se interrumpe la carga.
    uploadTimeout: 0, // Indicamos el tiempo de respuesta si se interrumpe la carga de la imagen.
  })
);

app.use("/user", userRouter);

app.use("/product", productRouter);

app.use("/config", configRouter);

app.use("/bungalows", bungalowsRouter);

app.use("/obras", obrasRouter)

await db.createConnection();

export default app;
