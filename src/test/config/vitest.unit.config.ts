import { defineConfig, mergeConfig } from 'vitest/config'

import baseConfig from './vitest.base.config'

const config = defineConfig({
  test: {
    include: ['**/?(*.)+(test).ts'],
  },
})

export default mergeConfig(baseConfig, config)
