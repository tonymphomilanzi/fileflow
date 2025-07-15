import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    // Exclude @ffmpeg/ffmpeg and @ffmpeg/util from pre-bundling.
    // This is crucial for @ffmpeg/ffmpeg to correctly load its WebAssembly modules.
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'], 
  },
  server: {
    // These headers are essential for SharedArrayBuffer to be enabled,
    // which is required by @ffmpeg/ffmpeg for optimal performance and functionality.
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
})
