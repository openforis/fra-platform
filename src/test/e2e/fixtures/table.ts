import { Promises } from 'utils/promises'

import { TableApi, type TableSeed } from 'test/e2e/api/table'
import { test as base } from 'test/e2e/fixtures/auth'

type TableOptions = {
  tableSeeds: Array<TableSeed>
}

type TableFixtures = {
  tables: void
}

export const test = base.extend<TableOptions & TableFixtures>({
  // Values of type Arrays for tableSeeds need to be passed as a [value, { scope: 'test'}] tuple
  // Playwright will keep only the first element of an array
  // For more information, see Playwrights docs: Array as an option value
  tableSeeds: [[], { option: true }],

  // Seeds the given tables before the test and clears them after it (even if the test failed).
  // Runs for every test, so a seed without values is a plain "clean up this table afterwards"
  tables: [
    async ({ authenticatedPage, tableSeeds }, use): Promise<void> => {
      await Promises.each(tableSeeds, (seed) => TableApi.setValues(authenticatedPage, seed))

      await use()

      await Promises.each(
        tableSeeds.filter(({ cleanup = true }) => cleanup),
        (seed) => TableApi.clear(authenticatedPage, seed)
      )
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'
