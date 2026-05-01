import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base:"/",
  build: {
    outDir: path.resolve(__dirname, "../server/public"), //  output to server/public
    emptyOutDir: true, // cleans old files before building
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
