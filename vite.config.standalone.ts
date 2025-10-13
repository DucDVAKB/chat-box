import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Config để build standalone bundle (không phải library)
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-standalone',
    rollupOptions: {
      input: 'src/embed.tsx',
      output: {
        entryFileNames: 'chat-widget.js',
        format: 'iife',
        name: 'ChatWidgetBundle'
      }
    }
  }
})
