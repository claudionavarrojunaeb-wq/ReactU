import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import https from "https";
import fs from "fs";

const app = express();
const PORT = 3002;

// middlewares
app.use(express.json());
app.use(cors());

// rutas
app.use("/auth", authRoutes);

// rutas de certificados
const certPath = "./certs/localhost.pem";
const keyPath = "./certs/localhost-key.pem";

// fallback automático
const useHttps = fs.existsSync(certPath) && fs.existsSync(keyPath);

if (useHttps) {
  https.createServer(
    {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    app
  ).listen(PORT, () => {
    console.log(`Auth service corriendo en https://localhost:${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Auth service corriendo en http://localhost:${PORT}`);
  });
}