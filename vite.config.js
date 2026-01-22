// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/backend-api": {
          target: "http://localhost:30081",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/backend-api/, ""),
        },
      },
    },
  };
});
