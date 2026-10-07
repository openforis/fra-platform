import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { type Cycle } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'
import { Routes } from 'meta/routes/routes'

import { buildSeedValues, type TableLocation } from 'test/e2e/api/table'
import { expect, test } from 'test/e2e/fixtures/table'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'

const countryIso: CountryIso = 'X03'
const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const homePath = Routes.CountryHome.generatePath({ assessmentName, countryIso, cycleName })

const FRA_YEARS = Years.fraYears({ name: cycleName } as Cycle)

// Extent of forest

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

const extentOfForestValues = buildSeedValues(FRA_YEARS, VARIABLES_EXTENT_OF_FOREST)

// Forest characteristics

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

const forestCharacteristicsValues = buildSeedValues(FRA_YEARS, VARIABLES_FOREST_CHARACTERISTICS)

// Growing stock

const growingStockLocation: TableLocation = {
  countryIso,
  sectionName: 'growingStock',
  // section: growingStock has no matching table name
  // table names: growingStockAvg and growingStockTotal
  tableName: TableNames.growingStockAvg,
}
const growingStockPath = SectionUtils.path(growingStockLocation)
const VARIABLES_GROWING_STOCK: Record<string, string> = {
  naturallyRegeneratingForest: '150',
  otherWoodedLand: '30',
}

const growingStockValues = buildSeedValues(FRA_YEARS, VARIABLES_GROWING_STOCK)

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
      await TableDomUtils.expectSeededValuesMatch({
        page,
        colNames: FRA_YEARS,
        variableNames: Object.keys(VARIABLES_EXTENT_OF_FOREST),
        getSeededDatum: seededTableData,
      })
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
      await TableDomUtils.expectSeededValuesMatch({
        page,
        colNames: FRA_YEARS,
        variableNames: Object.keys(VARIABLES_FOREST_CHARACTERISTICS),
        getSeededDatum: seededTableData,
      })
      await expect(page.locator('.toast.error')).toHaveCount(0)

      await context.close()
    })
  })

  test.describe('Growing stock (2a)', () => {
    test.use({ tableSeeds: [{ ...growingStockLocation, values: growingStockValues }] })

    test('a public (not logged in) user sees the seeded values with no errors', async ({
      browser,
      seededTableData,
    }) => {
      const context = await browser.newContext()
      const page = await context.newPage()

      await page.goto(growingStockPath)
      await TableDomUtils.expectSeededValuesMatch({
        page,
        colNames: FRA_YEARS,
        variableNames: Object.keys(VARIABLES_GROWING_STOCK),
        getSeededDatum: seededTableData,
        // growingStockTotal renders on the same page and shares these row variable names
        tableName: growingStockLocation.tableName,
      })
      await expect(page.locator('.toast.error')).toHaveCount(0)

      await context.close()
    })
  })
})
