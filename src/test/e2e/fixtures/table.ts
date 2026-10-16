import { AssessmentNames } from 'meta/assessment/assessment'
import { type ColName } from 'meta/assessment/col'
import { CycleNames } from 'meta/assessment/cycle/names'
import { type VariableName } from 'meta/assessment/variable'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Promises } from 'utils/promises'

import { TableApi, type TableSeed } from 'test/e2e/api/table'
import { test as base } from 'test/e2e/fixtures/auth'

const assessmentName = AssessmentNames.fra

type TableOptions = {
  tableSeeds: Array<TableSeed>
}

type GetSeededDatum = (props: { colName: ColName; variableName: VariableName }) => string | undefined

type TableFixtures = {
  tables: void
  seededTableData: GetSeededDatum
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

  // param _tables: wait for 'tables' to be ready before executing seededTableData
  seededTableData: async ({ authenticatedPage, tableSeeds, tables: _tables }, use): Promise<void> => {
    const [seed] = tableSeeds
    if (!seed) {
      await use(() => undefined)
      return
    }

    const { countryIso, cycleName = CycleNames._2025, tableName } = seed
    const data = await TableApi.getValues(authenticatedPage, seed)

    const getSeededDatum: GetSeededDatum = ({ colName, variableName }) =>
      RecordAssessmentDatas.getDatum({ assessmentName, countryIso, cycleName, data, tableName, colName, variableName })

    await use(getSeededDatum)
  },
})

export { expect } from '@playwright/test'
