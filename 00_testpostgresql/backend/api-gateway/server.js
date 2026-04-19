import express from "express";
import https from "https";
import fs from "fs";
import jwt from "jsonwebtoken";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
// =======================
// 🔧 __dirname (ES MODULES)
// =======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =======================
// 🚀 APP
// =======================
const app = express();

// =======================
// 🔐 SEGURIDAD
// =======================
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

app.use(express.json());

// =======================
// 🔑 CONFIG
// =======================
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// =======================
// 🔐 JWT MIDDLEWARE
// =======================
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido" });
  }
}

// =======================
// 👤 ROLES
// =======================
function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Solo admin" });
  }
  next();
}

// =======================
// 🔁 PROXIES
// =======================

// 🔓 AUTH (PÚBLICO)
app.use("/auth", createProxyMiddleware({
  target: "http://localhost:3002", // 👈 AJUSTA SI TU AUTH ESTÁ EN 3001
  changeOrigin: true,
}));

// 🔐 USUARIOS (PROTEGIDO)
app.use("/usuarios", verifyToken, createProxyMiddleware({
  target: "http://localhost:3001", // 👈 AJUSTA SEGÚN TU SERVICIO
  changeOrigin: true,
}));

// 🔐 ADMIN
app.get("/admin", verifyToken, requireAdmin, (req, res) => {
  res.json({
    message: "Zona admin",
    user: req.user
  });
});

// ❤️ HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// =======================
// 🔒 HTTPS CONFIG
// =======================
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

// =======================
// 🚀 START SERVER
// =======================
https.createServer(httpsOptions, app).listen(3000, () => {
  console.log("🚀 Gateway HTTPS en https://localhost:3000");
});