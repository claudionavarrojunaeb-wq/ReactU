import express from "express";
import cors from "cors";

import usuariosRoutes from "./routes/usuarios.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://10.162.14.62:5173"
  ]
}));

app.use(express.json());

// API routes
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/auth", authRoutes);

export default app;