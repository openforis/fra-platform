import { type Country } from 'meta/area/country'
import { CountryStatus } from 'meta/area/countryStatus'

import { CountryApi, type CountryLocation } from 'test/e2e/api/country'
import { test as base } from 'test/e2e/fixtures/auth'

type CountryOptions = {
  countrySeed: CountryLocation | undefined
}

type CountryFixtures = {
  // The country given in countrySeed, published for the test
  publishedCountry: Country
}

export const test = base.extend<CountryOptions & CountryFixtures>({
  countrySeed: [undefined, { option: true }],

  // Publishes the country before the test and puts its status back after it (even if the test failed)
  publishedCountry: async ({ authenticatedPage, countrySeed }, use): Promise<void> => {
    if (!countrySeed) {
      throw new Error('publishedCountry fixture needs the countrySeed option: test.use({ countrySeed: { ... } })')
    }

    const country = await CountryApi.get(authenticatedPage, countrySeed)
    const wasNotStarted = country.props.status === CountryStatus.notStarted
    // A country can't be set back to not started, so it goes to editing
    const previousStatus = wasNotStarted ? CountryStatus.editing : country.props.status

    const published = await CountryApi.setStatus(authenticatedPage, countrySeed, CountryStatus.published)

    await use(published)

    await CountryApi.setStatus(authenticatedPage, countrySeed, previousStatus)
  },
})

export { expect } from '@playwright/test'
