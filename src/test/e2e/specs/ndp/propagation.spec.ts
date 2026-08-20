import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'

const countryIso = 'X11'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })

// Choose year outside of FRA year to test column is added correctly
const seededYear = 2013
const className = 'Forest land'

const nationalClass = {
  ...ODPNationalClassFactory.newNationalClass({ name: className }),
  area: '1000',
  forestPercent: '60',
  otherWoodedLandPercent: '30',
}

// Forest and other wooded land come from the national data point:
// 1000 ha at 60% and at 30%
const expectedForestArea = '600'
const expectedOtherWoodedLand = '300'
// Total land area is external data, 4412 for every X11 year, and other land is what remains of it
const expectedTotalLandArea = '4412.00'
const expectedOtherLand = '3512.00'

/**
 * Test how NDP data flows through the platform to tables
 */
test.describe('National data point: propagation', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [nationalClass], year: seededYear }] })

  test('NC sees the national data point values in section 1a', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const year = String(seededYear)

    // Check that ODP link is visible
    await expect(page.locator('.table-grid__odp-link', { hasText: year })).toBeVisible({ timeout: 10000 })

    // Check values are as expected from NDP
    await TableDomUtils.expectCellValue(page, 'forestArea', year, expectedForestArea)
    await TableDomUtils.expectCellValue(page, 'otherWoodedLand', year, expectedOtherWoodedLand)
    await TableDomUtils.expectCellValue(page, 'otherLand', year, expectedOtherLand)
    await TableDomUtils.expectCellValue(page, 'totalLandArea', year, expectedTotalLandArea)
  })
})
