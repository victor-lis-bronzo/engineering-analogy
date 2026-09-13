import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 3500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three/fiber') || id.includes('@react-three/drei')) {
            return 'vendor-three'
          }
          if (id.includes('@react-three/rapier') || id.includes('@dimforge')) {
            return 'vendor-rapier'
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
