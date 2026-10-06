import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { type Cycle } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'
import { Routes } from 'meta/routes/routes'
import { Numbers } from 'utils/numbers'

import { type TableLocation, type TableSeedValue } from 'test/e2e/api/table'
import { expect, test } from 'test/e2e/fixtures/table'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'

const countryIso: CountryIso = 'X03'
const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const homePath = Routes.CountryHome.generatePath({ assessmentName, countryIso, cycleName })

const location: TableLocation = {
  countryIso,
  sectionName: SectionNames.extentOfForest,
  tableName: TableNames.extentOfForest,
}
const sectionPath = SectionUtils.path(location)

const FRA_YEARS = Years.fraYears({ name: cycleName } as Cycle)

const VARIABLES_EXTENT_OF_FOREST: Record<string, string> = {
  forestArea: '500',
  otherWoodedLand: '100',
}

const values: Array<TableSeedValue> = FRA_YEARS.flatMap((colName) =>
  Object.entries(VARIABLES_EXTENT_OF_FOREST).map(([variableName, value]) => ({ colName, value, variableName }))
)

test.describe('Public view', () => {
  test('a public (not logged in) user can access a country overview page with no errors', async ({ page }) => {
    await page.goto(homePath)

    await expect(page).toHaveURL(new RegExp(homePath))
    await expect(page.locator('.nav-section__header').first()).toBeVisible()
    await expect(page.locator('.toast.error')).toHaveCount(0)
  })

  test.describe('Extent of forest (1a)', () => {
    test.use({ tableSeeds: [{ ...location, values }] })

    test('a public (not logged in) user sees the seeded values with no errors', async ({
      browser,
      seededTableData,
    }) => {
      const context = await browser.newContext()
      const page = await context.newPage()

      await page.goto(sectionPath)

      await Promise.all(
        FRA_YEARS.flatMap((colName) =>
          Object.keys(VARIABLES_EXTENT_OF_FOREST).map((variableName) => {
            const expectedRaw = seededTableData({ colName, variableName })
            // A blank cell shows as '' in the DOM, not null
            // match that instead of Numbers.toFixed's null
            const expectedValue = Numbers.toFixed(expectedRaw) ?? ''
            return TableDomUtils.expectCellValue(page, variableName, colName, expectedValue)
          })
        )
      )

      await expect(page.locator('.toast.error')).toHaveCount(0)

      await context.close()
    })
  })
})
