import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    coverage: {
      provider: 'v8', // coverage via c8
      reporter: ['text', 'lcov'],
    },
    environment: 'node', // use node environment for backend tests
    globals: true, // enables describe/it global names
    typecheck: {
      tsconfig: './tsconfig.vitest.json',
    },
  },
})
