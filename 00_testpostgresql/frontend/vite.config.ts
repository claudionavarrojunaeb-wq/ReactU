import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs"
import path from "path"

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, "../backend/api-gateway/certs/localhost-key.pem")
      ),
      cert: fs.readFileSync(
        path.resolve(__dirname, "../backend/api-gateway/certs/localhost.pem")
      ),
    },

    // 🔥 PROXY (CLAVE)
    proxy: {
      "/auth": {
        target: "https://localhost:3000",
        changeOrigin: true,
        secure: false, // ⚠️ necesario por mkcert
      },
      "/usuarios": {
        target: "https://localhost:3000",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})