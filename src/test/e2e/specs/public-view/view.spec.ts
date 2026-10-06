import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { type Cycle } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'
import { Routes } from 'meta/routes/routes'

import { type TableLocation, type TableSeedValue } from 'test/e2e/api/table'
import { expect, test } from 'test/e2e/fixtures/table'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'

const countryIso: CountryIso = 'X03'
const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const homePath = Routes.CountryHome.generatePath({ assessmentName, countryIso, cycleName })

const FRA_YEARS = Years.fraYears({ name: cycleName } as Cycle)

const extentOfForestLocation: TableLocation = {
  countryIso,
  sectionName: SectionNames.extentOfForest,
  tableName: TableNames.extentOfForest,
}
const extentOfForestPath = SectionUtils.path(extentOfForestLocation)

const VARIABLES_EXTENT_OF_FOREST: Record<string, string> = {
  forestArea: '500',
  otherWoodedLand: '100',
}

const extentOfForestValues: Array<TableSeedValue> = FRA_YEARS.flatMap((colName) =>
  Object.entries(VARIABLES_EXTENT_OF_FOREST).map(([variableName, value]) => ({ colName, value, variableName }))
)

const forestCharacteristicsLocation: TableLocation = {
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
  tableName: TableNames.forestCharacteristics,
}
const forestCharacteristicsPath = SectionUtils.path(forestCharacteristicsLocation)

const VARIABLES_FOREST_CHARACTERISTICS: Record<string, string> = {
  naturalForestArea: '400',
  plantationForestArea: '50',
}

const forestCharacteristicsValues: Array<TableSeedValue> = FRA_YEARS.flatMap((colName) =>
  Object.entries(VARIABLES_FOREST_CHARACTERISTICS).map(([variableName, value]) => ({ colName, value, variableName }))
)

test.describe('Public view', () => {
  test('a public (not logged in) user can access a country overview page with no errors', async ({ page }) => {
    await page.goto(homePath)

    await expect(page).toHaveURL(new RegExp(homePath))
    await expect(page.locator('.nav-section__header').first()).toBeVisible()
    await expect(page.locator('.toast.error')).toHaveCount(0)
  })

  test.describe('Extent of forest (1a)', () => {
    test.use({ tableSeeds: [{ ...extentOfForestLocation, values: extentOfForestValues }] })

    test('a public (not logged in) user sees the seeded values with no errors', async ({
      browser,
      seededTableData,
    }) => {
      const context = await browser.newContext()
      const page = await context.newPage()

      await page.goto(extentOfForestPath)
      await TableDomUtils.expectSeededValuesMatch(
        page,
        FRA_YEARS,
        Object.keys(VARIABLES_EXTENT_OF_FOREST),
        seededTableData
      )
      await expect(page.locator('.toast.error')).toHaveCount(0)

      await context.close()
    })
  })

  test.describe('Forest characteristics (1b)', () => {
    test.use({ tableSeeds: [{ ...forestCharacteristicsLocation, values: forestCharacteristicsValues }] })

    test('a public (not logged in) user sees the seeded values with no errors', async ({
      browser,
      seededTableData,
    }) => {
      const context = await browser.newContext()
      const page = await context.newPage()

      await page.goto(forestCharacteristicsPath)
      await TableDomUtils.expectSeededValuesMatch(
        page,
        FRA_YEARS,
        Object.keys(VARIABLES_FOREST_CHARACTERISTICS),
        seededTableData
      )
      await expect(page.locator('.toast.error')).toHaveCount(0)

      await context.close()
    })
  })
})
