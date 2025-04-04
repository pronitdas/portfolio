import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'



export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  build: {
    // Equivalent to Next.js experimental parallel builds
    minify: 'esbuild',
    target: 'esnext',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    // Development server settings
    port: 3000,
    open: true,
  },
  // Handle TypeScript and ESLint
  esbuild: {
    // Skip type checking during build for speed
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true,
      },
    },
  },
}) 