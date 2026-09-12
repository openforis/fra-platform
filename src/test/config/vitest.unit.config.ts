import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'

import baseConfig from './vitest.base.config'

const config = defineConfig({
  test: {
    // Exclude integration tests from unit runs
    exclude: [...configDefaults.exclude, 'src/test/integration/**'],
    include: ['**/?(*.)+(test).ts'],
  },
})

export default mergeConfig(baseConfig, config)
