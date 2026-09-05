import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'

test.describe('National data point: use national data points toggle', () => {
  test.describe('country with no national data points', () => {
    const countryIso = 'X16' // country with no NDPs
    const forestCharacteristicsPath = SectionUtils.path({ countryIso, sectionName: SectionNames.forestCharacteristics })

    test('NC does not see the toggle in 1b', async ({ authenticatedPage }) => {
      const page = authenticatedPage

      await page.goto(forestCharacteristicsPath)
      await DOMUtils.ensureEditingUnlocked(page)

      // Toggle button hidden when country has no NDPs
      await expect(page.getByRole('button', { name: /national data points/i })).toHaveCount(0, { timeout: 10000 })
    })
  })

  test.describe('country with an existing national data point', () => {
    const countryIso = 'X05' // country with NDPs
    const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })
    const forestCharacteristicsPath = SectionUtils.path({
      countryIso,
      sectionName: SectionNames.forestCharacteristics,
    })

    const seededYear = 2013
    const className = 'Forest land'

    const nationalClass = {
      ...ODPNationalClassFactory.newNationalClass({ name: className }),
      area: '1000',
      forestNaturalPercent: '50',
      forestPercent: '60',
      forestPlantationPercent: '30',
      otherPlantedForestPercent: '20',
      otherWoodedLandPercent: '30',
    }

    // 1000 ha area
    // 60% forest (600)
    const expectedForestArea = '600.00'
    // 50% naturally regenerating (300)
    const expectedNaturalForestArea = '300.00'

    test.use({ ndpSeeds: [{ countryIso, nationalClasses: [nationalClass], year: seededYear }] })

    test('NC turns off national data points and section 1b stops merging them', async ({ authenticatedPage, ndp }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      const year = String(seededYear)

      // == 1a shows NDP regardless of 1b status
      await page.goto(extentOfForestPath)

      await expect(page.locator('.table-grid__odp-link', { hasText: year })).toBeVisible({ timeout: 10000 })
      await TableDomUtils.expectCellValue(page, 'forestArea', year, expectedForestArea)

      // == 1b shows initially NDP
      await page.goto(forestCharacteristicsPath)
      await DOMUtils.ensureEditingUnlocked(page)

      await expect(page.locator('.table-grid__odp-link', { hasText: year })).toBeVisible({ timeout: 10000 })

      await NDPDomUtils.clickToggleNDPUsage(page)

      // == 1b - Opting out hides all NDPs
      await expect(page.locator('.table-grid__odp-link', { hasText: year })).toHaveCount(0, { timeout: 10000 })
      await TableDomUtils.expectCellMissing(page, 'naturalForestArea', year)

      // == 1a - Opting out has no effect on how we show NDPs
      await page.goto(extentOfForestPath)
      await expect(page.locator('.table-grid__odp-link', { hasText: year })).toBeVisible({ timeout: 10000 })
      await TableDomUtils.expectCellValue(page, 'forestArea', year, expectedForestArea)

      // Opt back in restoring NDP visibility
      await page.goto(forestCharacteristicsPath)
      await DOMUtils.ensureEditingUnlocked(page)

      await NDPDomUtils.clickToggleNDPUsage(page)

      await expect(page.locator('.table-grid__odp-link', { hasText: year })).toBeVisible({ timeout: 10000 })
      await TableDomUtils.expectCellValue(page, 'naturalForestArea', year, expectedNaturalForestArea)
    })
  })

  // TODO when table data is seeded, possibly just one test
  // TODO double check the dependant table x variable
  // TODO also important to check FRA/1a effects on panEuropean
  // test.describe.skip('NC turns off national data points and sees dependant calculations update in', () => {
  //   test('growingStockTotal plantationForestArea', () => {})
  //   test('growingStockTotal otherPlantedForestArea', () => {})
  //   test('growingStockTotal naturalForestArea', () => {})
  //   test('growingStockTotal primaryForest', () => {})
  //   test('growingStockTotal plantedForest', () => {})
  //   test('growingStockTotal plantationForestIntroducedArea', () => {})
  //   test('primaryForestByClimaticDomain primaryForest', () => {})
  //   test('panEuropean table_4_2a naturalForestArea', () => {})
  //   test('panEuropean table_4_2a plantedForest', () => {})
  //   test('panEuropean table_4_3a plantationForestArea', () => {})
  //   test('panEuropean table_4_3a primaryForest', () => {})
  //   test('panEuropean table_4_3b plantationForestIntroducedArea', () => {})
  // })
})
