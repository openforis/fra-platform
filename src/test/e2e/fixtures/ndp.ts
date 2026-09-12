import { type OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Promises } from 'utils/promises'

import { NdpApiUtils, type NdpSeed } from 'test/e2e/api/ndp'
import { test as base } from 'test/e2e/fixtures/auth'

type NdpOptions = {
  ndpSeeds: Array<NdpSeed>
}

type NdpFixtures = {
  ndp: OriginalDataPoint
  ndps: Array<OriginalDataPoint>
}

export const test = base.extend<NdpOptions & NdpFixtures>({
  ndpSeeds: [[], { option: true }],

  // Values of type Arrays for ndpSeeds need to be passed as a [value, { scope: 'test'}] tuple
  // Playwright will keep only the first element of an array
  // For more information, see Playwrights docs: Array as an option value
  ndps: async ({ authenticatedPage, ndpSeeds }, use) => {
    // Create NDPs for test
    const created: Array<OriginalDataPoint> = await Promises.each(ndpSeeds, (seed) =>
      NdpApiUtils.create(authenticatedPage, seed)
    )

    // pass NDPs to test
    await use(created)

    // Remove NDPs after test
    await Promises.each(ndpSeeds, (seed) => NdpApiUtils.removeIfExists(authenticatedPage, seed))
  },

  ndp: async ({ ndps }, use) => {
    await use(ndps[0])
  },
})

export { expect } from '@playwright/test'
