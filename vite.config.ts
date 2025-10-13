import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 3001,      // Default port 3001
    strictPort: true,
    cors: true
  },
  preview: {
    host: '0.0.0.0',
    port: 3001
  },
  build: {
    lib: {
      entry: 'src/embed.tsx',
      name: 'ChatWidget',
      fileName: 'chat-widget',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        exports: 'default'
      }
    }
  }
})
