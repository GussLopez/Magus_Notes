import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Cargar las variables de entorno
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api/auth": {
          target: env.VITE_API_URL || "http://localhost:4000",
          changeOrigin: true,
          configure: (proxy, options) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              console.log("Proxy request to:", req.url);
            });
          },
        },
      },
    },
    define: {
      "process.env": {
        VITE_API_URL: env.VITE_API_URL,
        VITE_FACEBOOK_CLIENT_ID: env.VITE_FACEBOOK_CLIENT_ID,
        VITE_FACEBOOK_CLIENT_SECRET: env.VITE_FACEBOOK_CLIENT_SECRET,
        VITE_NEXTAUTH_URL: env.VITE_NEXTAUTH_URL,
      },
    },
  };
});
