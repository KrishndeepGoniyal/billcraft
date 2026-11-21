import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          pdf: ['jspdf', 'html2canvas', 'html-to-image'],
          icons: ['lucide-react', 'qrcode.react', 'canvas-confetti'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
