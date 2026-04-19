# 🚀 ReactU -- Arquitectura de Microservicios con Gateway HTTPS y JWT

## 🧠 Descripción

Este proyecto implementa una arquitectura moderna basada en:

-   API Gateway (HTTPS)
-   Microservicios (Auth + Usuarios)
-   Autenticación con JWT
-   HTTPS local con mkcert
-   Frontend con React + Vite
-   Proxy interno (sin CORS)

------------------------------------------------------------------------

## 🏗️ Arquitectura

Frontend (HTTPS :5173)\
→ Gateway (HTTPS :3000)\
→ Auth (3002) / Usuarios (3001)

## 🔐 Certificados HTTPS

Ejecutar:

```bash
mkcert -install
mkcert localhost

------------------------------------------------------------------------

## 🔐 Seguridad

-   HTTPS (TLS en Gateway)
-   JWT
-   Helmet
-   Rate limiting

------------------------------------------------------------------------

## 📁 Estructura

00_testpostgresql/ ├── backend/ │ ├── api-gateway/ │ ├── auth-service/ │
└── usuarios-service/ ├── frontend/ ├── .env └── package.json

------------------------------------------------------------------------

## ⚙️ Variables de entorno

.env:

JWT_SECRET=super_ultra_secret

------------------------------------------------------------------------

## 🌐 Gateway

https://localhost:3000

Responsabilidades: - HTTPS - Validación JWT - Proxy

------------------------------------------------------------------------

## 🔁 Endpoints

/auth/login\
/usuarios\
/admin\
/health

------------------------------------------------------------------------

## ⚛️ Frontend

https://localhost:5173

------------------------------------------------------------------------

## 🚀 Ejecución

npm run dev

------------------------------------------------------------------------

## 🧠 Nivel del proyecto

✔ Arquitectura profesional\
✔ Seguridad real\
✔ Listo para portafolio

------------------------------------------------------------------------

## 🚀 Próximos pasos

-   PostgreSQL
-   Kafka
-   Deploy en VPS
-   Nginx

------------------------------------------------------------------------

## 🗣️ Explicación para entrevista

"Implementé una arquitectura con API Gateway que maneja HTTPS y
autenticación JWT.\
Los microservicios están desacoplados y el frontend se comunica solo con
el gateway, replicando un entorno real de producción."
