import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { v4 as uuidv4 } from 'uuid'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/client',
  },
  server: {
    port: 9000,
    proxy: {
      '/auth': {
        target: process.env.APP_URI ?? 'http://localhost:9001',
      },
      '/img': {
        target: process.env.APP_URI ?? 'http://localhost:9001',
      },
      '/css': {
        target: process.env.APP_URI ?? 'http://localhost:9001',
      },
      '/video': {
        target: process.env.APP_URI ?? 'http://localhost:9001',
      },
      '/api': {
        target: process.env.APP_URI ?? 'http://localhost:9001',
      },
      '/definitions': {
        target: process.env.APP_URI ?? 'http://localhost:9001',
      },
      '/socket.io': {
        target: process.env.APP_URI ?? 'http://localhost:9001',
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      i18n: path.resolve(__dirname, 'src/i18n'),
      client: path.resolve(__dirname, 'src/client'),
      meta: path.resolve(__dirname, 'src/meta'),
      server: path.resolve(__dirname, 'src/server'),
      test: path.resolve(__dirname, 'src/test'),
      tools: path.resolve(__dirname, 'src/tools'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    __BUST__: JSON.stringify(uuidv4()),
    __GOOGLE_API__: JSON.stringify(process.env.FRA_GOOGLE_API),
    __GOOGLE_MAPS_API_KEY__: JSON.stringify(process.env.FRA_GOOGLE_MAPS_API_KEY),
    __APPLICATION_VERSION__: JSON.stringify(process.env.APP_VERSION),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().split('T')[0]),
    __URL_STATISTICAL_FACTSHEETS__: JSON.stringify(process.env.URL_STATISTICAL_FACTSHEETS),
  },
})
