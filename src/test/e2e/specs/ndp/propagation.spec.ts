import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'

const countryIso = 'X11'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })
const forestCharacteristicsPath = SectionUtils.path({ countryIso, sectionName: SectionNames.forestCharacteristics })

// Choose year outside of FRA year to test column is added correctly
const seededYear = 2013
// FRA year 2025 gets overridden by NDP data
const overriddenYear = 2025
// FRA Year 2020 stays editable when no NDP data
const editableYear = 2020
const className = 'Forest land'

const nationalClass = {
  ...ODPNationalClassFactory.newNationalClass({ name: className }),
  area: '1000',
  forestNaturalForestOfWhichPrimaryForestPercent: '50',
  forestNaturalPercent: '50',
  forestPercent: '60',
  forestPlantationIntroducedPercent: '50',
  forestPlantationPercent: '30',
  otherPlantedForestPercent: '20',
  otherWoodedLandPercent: '30',
}

// Forest and other wooded land come from the national data point:
// 1000 ha at 60% and at 30%
const expectedForestArea = '600.00'
const expectedOtherWoodedLand = '300.00'
// Total land area is external data, 4412 for every X11 year, and other land is what remains of it
const expectedTotalLandArea = '4412.00'
const expectedOtherLand = '3512.00'

// Section 1b splits the 600 ha of forest:
// 50% naturally regenerating
// 30% plantation
// 20% other planted
// ---
// Primary forest is 50% of naturally regenerating area
// introduced is 50% of plantation area
const expectedNaturalForestArea = '300.00'
const expectedPrimaryForest = '150.00'

const expectedPlantationForestArea = '180.00'
const expectedPlantationForestIntroducedArea = '90.00'

const expectedOtherPlantedForestArea = '120.00'
const expectedPlantedForest = '300.00'
const expectedTotalForestArea = '600.00'

/**
 * Test how NDP data flows through the platform to tables
 */
test.describe('National data point: propagation', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [nationalClass], year: seededYear }] })

  test('NC sees the national data point values in sections 1a and 1b', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    const year = String(seededYear)

    // == Section 1a
    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    // Check ODP link exists
    await expect(page.locator('.table-grid__odp-link', { hasText: year })).toBeVisible({ timeout: 10000 })

    // Check values are as expected from NDP
    await TableDomUtils.expectCellValue(page, 'forestArea', year, expectedForestArea)
    await TableDomUtils.expectCellValue(page, 'otherWoodedLand', year, expectedOtherWoodedLand)
    await TableDomUtils.expectCellValue(page, 'otherLand', year, expectedOtherLand)
    await TableDomUtils.expectCellValue(page, 'totalLandArea', year, expectedTotalLandArea)

    // == Section 1b
    await page.goto(forestCharacteristicsPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await expect(page.locator('.table-grid__odp-link', { hasText: year })).toBeVisible({ timeout: 10000 })

    // Check values are as expected from NDP
    await TableDomUtils.expectCellValue(page, 'naturalForestArea', year, expectedNaturalForestArea)
    await TableDomUtils.expectCellValue(page, 'primaryForest', year, expectedPrimaryForest)
    await TableDomUtils.expectCellValue(page, 'plantationForestArea', year, expectedPlantationForestArea)
    await TableDomUtils.expectCellValue(
      page,
      'plantationForestIntroducedArea',
      year,
      expectedPlantationForestIntroducedArea
    )
    await TableDomUtils.expectCellValue(page, 'otherPlantedForestArea', year, expectedOtherPlantedForestArea)
    await TableDomUtils.expectCellValue(page, 'plantedForest', year, expectedPlantedForest)
    await TableDomUtils.expectCellValue(page, 'totalForestArea', year, expectedTotalForestArea)
  })

  test('NC cannot edit table cells that come from a national data point', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    const year = String(seededYear)

    // == Section 1a
    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await TableDomUtils.expectCellReadOnly(page, 'forestArea', year)
    await TableDomUtils.expectCellReadOnly(page, 'otherWoodedLand', year)

    // Year without NDP
    await TableDomUtils.expectCellEditable(page, 'forestArea', String(editableYear))

    // == Section 1b
    await page.goto(forestCharacteristicsPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await TableDomUtils.expectCellReadOnly(page, 'naturalForestArea', year)
    await TableDomUtils.expectCellReadOnly(page, 'plantationForestArea', year)
    await TableDomUtils.expectCellReadOnly(page, 'otherPlantedForestArea', year)

    // Year without NDP
    await TableDomUtils.expectCellEditable(page, 'naturalForestArea', String(editableYear))
  })

  test('NC deletes the national data point and its column disappears from sections 1a and 1b', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const year = String(seededYear)
    await TableDomUtils.expectCellValue(page, 'forestArea', year, expectedForestArea)

    await TableDomUtils.clickOdpLink(page, {
      countryIso,
      sectionName: SectionNames.extentOfForest,
      year: seededYear,
    })

    page.once('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Delete' }).first().click()
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)

    // == Expect 1a gone
    await expect(page.locator('.table-grid__odp-link', { hasText: year })).toHaveCount(0, { timeout: 10000 })
    await TableDomUtils.expectCellMissing(page, 'forestArea', year)

    // == Expect 1b gone
    await page.goto(forestCharacteristicsPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await expect(page.locator('.table-grid__odp-link', { hasText: year })).toHaveCount(0, { timeout: 10000 })
    await TableDomUtils.expectCellMissing(page, 'naturalForestArea', year)
  })

  test.describe('year matching an existing column', () => {
    test.use({ ndpSeeds: [{ countryIso, nationalClasses: [nationalClass], year: overriddenYear }] })

    test('NC sees the national data point overwrite a cell and lock it', async ({ authenticatedPage, ndp }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      const year = String(overriddenYear)

      // == Section 1a
      await page.goto(extentOfForestPath)
      await DOMUtils.ensureEditingUnlocked(page)

      await expect(page.locator('.table-grid__odp-link', { hasText: year })).toBeVisible({ timeout: 10000 })
      await expect(page.locator(`[id$="variableName_forestArea_colName_${year}"]`)).toHaveCount(1)

      await TableDomUtils.expectCellValue(page, 'forestArea', year, expectedForestArea)
      await TableDomUtils.expectCellReadOnly(page, 'forestArea', year)
      await TableDomUtils.expectCellReadOnly(page, 'otherWoodedLand', year)

      // == Section 1b
      await page.goto(forestCharacteristicsPath)
      await DOMUtils.ensureEditingUnlocked(page)

      await expect(page.locator('.table-grid__odp-link', { hasText: year })).toBeVisible({ timeout: 10000 })
      await expect(page.locator(`[id$="variableName_naturalForestArea_colName_${year}"]`)).toHaveCount(1)

      await TableDomUtils.expectCellValue(page, 'naturalForestArea', year, expectedNaturalForestArea)
      await TableDomUtils.expectCellReadOnly(page, 'naturalForestArea', year)
    })
  })
})
