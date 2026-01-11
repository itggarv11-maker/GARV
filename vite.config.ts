import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  // Removed the server configuration block because 'historyApiFallback' is not a valid property.
  // Vite handles SPA history fallback automatically when appType is 'spa' (default).
})
