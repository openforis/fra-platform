import { SectionNames } from 'meta/assessment/section'
import { Promises } from 'utils/promises'

import { NdpApiUtils, type NdpSeed } from 'test/e2e/api/ndp'
import { NdpData } from 'test/e2e/data/ndp'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'

const countryIso = 'X08'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })

const createdYearSimple = 2015
const createdYearComprehensive = 2016

test.describe('National data point: create', () => {
  const simpleSeed: NdpSeed = { countryIso, nationalClasses: [], year: createdYearSimple }
  const comprehensiveSeed: NdpSeed = { countryIso, nationalClasses: [], year: createdYearComprehensive }

  test.beforeEach(async ({ authenticatedPage }) => {
    await NdpApiUtils.removeIfExists(authenticatedPage, simpleSeed)
    await NdpApiUtils.removeIfExists(authenticatedPage, comprehensiveSeed)
  })

  test.afterEach(async ({ authenticatedPage }) => {
    await NdpApiUtils.removeIfExists(authenticatedPage, simpleSeed)
    await NdpApiUtils.removeIfExists(authenticatedPage, comprehensiveSeed)
  })

  test('NC creates a simple national data point and sees it back on the table', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await page.getByRole('link', { name: 'Add national data point' }).click()

    await NDPDomUtils.fillYear(page, String(createdYearSimple))
    await NDPDomUtils.fillDataSourcesV1Reference(page, 'https://example.com/e2e-reference')

    await NDPDomUtils.doneEditing(page)
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)

    await expect(page.locator('.table-grid__odp-link', { hasText: String(createdYearSimple) })).toBeVisible({
      timeout: 10000,
    })
  })

  // Based on Fra - 2025 - Finland - 2020
  test('NC creates a complete national data point with multiple national classes', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await page.getByRole('link', { name: 'Add national data point' }).click()

    // == Fill year
    await NDPDomUtils.fillYear(page, String(createdYearComprehensive))

    // Fill metadata (descriptions, etc)
    await NDPDomUtils.fillDataSourcesV1Reference(page, NdpData.getDefaultDataSourcesV1Reference())
    await NDPDomUtils.fillDataSourcesV1MethodsUsed(page, NdpData.getDefaultDataSourcesV1Method())
    await NDPDomUtils.fillDataSourcesV1AdditionalComments(page, NdpData.getDefaultDataSourcesV1Comments())
    await NDPDomUtils.fillComments(page, NdpData.getDefaultComments())

    // Fill national classes and numerical data
    const nationalClasses = NdpData.getDefaultClasses()
    const expectedForestArea = '22543.00'
    const expectedOtherWoodedLand = '752.00'

    await Promises.each(nationalClasses, async (nationalClass) => {
      const { area, forestPercent, name, otherWoodedLandPercent } = nationalClass
      await NDPDomUtils.createNewNationalClassification(page, name)
      await NDPDomUtils.fillNationalClassArea(page, name, area)
      await NDPDomUtils.fillNationalClassForestPercent(page, name, forestPercent)

      // fill OWL only if forest percent is not 100%
      if (forestPercent !== '100') {
        await NDPDomUtils.fillNationalClassOWLPercent(page, name, otherWoodedLandPercent)
      }
    })

    await NDPDomUtils.doneEditing(page)
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)

    const year = String(createdYearComprehensive)
    await expect(page.locator('.table-grid__odp-link', { hasText: year })).toBeVisible({ timeout: 10000 })
    await TableDomUtils.expectCellValue(page, 'forestArea', year, expectedForestArea)
    await TableDomUtils.expectCellValue(page, 'otherWoodedLand', year, expectedOtherWoodedLand)
  })
})
