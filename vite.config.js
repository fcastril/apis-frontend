import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Configuración para producción - SIN HASH para evitar problemas MIME
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        // IMPORTANTE: Sin hash para evitar problemas de MIME type
        entryFileNames: "assets/index.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/index.css";
          }
          return "assets/[name].[ext]";
        },
        // Separar chunks
        manualChunks: {
          vendor: ["react", "react-dom"],
          icons: ["lucide-react"],
        },
      },
    },
  },

  // Configuración para desarrollo
  server: {
    port: 3000,
    host: true,
  },

  // Configuración para preview
  preview: {
    port: 4173,
    host: true,
  },

  // Base path para deployment
  base: "/",
});
