import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      proxy: {
        // 🔐 Backend APIs
        '/api': {
          target: 'http://localhost:30081',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },

        // 🔑 Keycloak Auth
        '/auth': {
          target: 'http://localhost:30080',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/auth/, ''),
        }
      }
    }
  }
})
