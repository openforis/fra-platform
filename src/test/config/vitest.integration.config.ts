import { defineConfig, mergeConfig } from 'vitest/config'

import baseConfig from './vitest.base.config'

const config = defineConfig({
  test: {
    include: ['**/integration.test.ts', '**/*.integration.test.ts'],
  },
})

export default mergeConfig(baseConfig, config)
