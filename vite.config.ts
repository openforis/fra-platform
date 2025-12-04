import 'dotenv/config'

import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { version } from './package.json'

const port = 9000

export default defineConfig(({ mode }) => {
  const buildProd = mode === 'production'
  const appVersion = process.env.APP_VERSION ?? version

  return {
    // Build Configuration
    build: {
      cssCodeSplit: false,
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
        output: {
          dir: 'dist/client',
        },
      },
      sourcemap: !buildProd,
    },

    // Environment Variables Definition
    define: {
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      __GOOGLE_API__: JSON.stringify(process.env.FRA_GOOGLE_API),
      __GOOGLE_MAPS_API_KEY__: JSON.stringify(process.env.FRA_GOOGLE_MAPS_API_KEY),
      __APPLICATION_VERSION__: JSON.stringify(appVersion),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString().split('T')[0]),
    },

    // Dependency Pre-bundling Optimization
    optimizeDeps: {
      include: [
        '@reduxjs/toolkit',
        'axios',
        'classnames',
        'd3',
        'date-fns',
        'diff',
        'i18next',
        'jodit-react',
        'lodash.chunk',
        'lodash.clonedeep',
        'lodash.debounce',
        'lodash.isequal',
        'lodash.merge',
        'lodash.throttle',
        'marked',
        'react',
        'react-csv',
        'react-dom',
        'react-dropzone',
        'react-hook-form',
        'react-i18next',
        'react-paginate',
        'react-redux',
        'react-router',
        'react-select',
        'react-tooltip',
        'recharts',
        'socket.io-client',
        'uuid',
      ],
      exclude: [],
    },

    // Plugins
    plugins: [react(), tsconfigPaths()],

    // CSS Configuration
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '',
          sassOptions: {
            includePaths: [path.resolve(__dirname)],
          },
        },
      },
    },

    // Preview Server Configuration
    preview: {
      port,
    },

    // Development Server Configuration
    server: {
      allowedHosts: ['localhost', 'fra-data.local'],
      port,
      watch: {
        usePolling: true,
      },
      proxy: {
        '/api': {
          target: process.env.APP_URI ?? 'http://localhost:9001',
        },
        '/auth': {
          target: process.env.APP_URI ?? 'http://localhost:9001',
        },
        '/css': {
          target: process.env.APP_URI ?? 'http://localhost:9001',
        },
        '/definitions': {
          target: process.env.APP_URI ?? 'http://localhost:9001',
        },
        '/api-docs': {
          target: process.env.APP_URI ?? 'http://localhost:9001',
        },
        '/panEuropean-api-docs': {
          target: process.env.APP_URI ?? 'http://localhost:9001',
        },
        '/socket.io': {
          target: process.env.APP_URI ?? 'http://localhost:9001',
          ws: true,
        },
      },
    },

    // Path Resolution
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
      },
    },
  }
})
