import { type Country } from 'meta/area/country'
import { type CountryStatus } from 'meta/area/countryStatus'

import { CountryApi, type CountryLocation } from 'test/e2e/api/country'
import { test as base } from 'test/e2e/fixtures/auth'

type CountrySeed = CountryLocation & {
  status: CountryStatus
}

type CountryOptions = {
  countrySeed: CountrySeed | undefined
}

type CountryFixtures = {
  country: Country
}

export const test = base.extend<CountryOptions & CountryFixtures>({
  countrySeed: [undefined, { option: true }],

  // Sets the country status before the test and puts the original one back after
  country: async ({ authenticatedPage, countrySeed }, use): Promise<void> => {
    if (!countrySeed) {
      throw new Error('country fixture needs the countrySeed option: test.use({ countrySeed: { ... } })')
    }

    const originalCountry = await CountryApi.get(authenticatedPage, countrySeed)
    const country = await CountryApi.setStatus(authenticatedPage, countrySeed, countrySeed.status)

    await use(country)

    await CountryApi.setStatus(authenticatedPage, countrySeed, originalCountry.props.status)
  },
})

export { expect } from '@playwright/test'
