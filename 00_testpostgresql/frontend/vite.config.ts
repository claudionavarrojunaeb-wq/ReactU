import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs"
import path from "path"
import https from "https" // 👈 IMPORTANTE

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

    proxy: {
      "/auth": {
        target: "http://localhost:3002",
        changeOrigin: true,
        secure: false,
        agent: new https.Agent({
          rejectUnauthorized: false
        })
      },
      "/usuarios": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        agent: new https.Agent({
          rejectUnauthorized: false
        })
      }
    }
  }
})