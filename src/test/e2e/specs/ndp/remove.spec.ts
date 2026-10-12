import { SectionNames } from 'meta/assessment/section'

import { NdpApi } from 'test/e2e/api/ndp'
import { Timeouts } from 'test/e2e/config/timeouts'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'

const countryIso = 'X09'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })

const seededYear = 2015
const otherYear = 2016
const className = 'Forest land'

const areaCell = 'td.fra-table__cell.fra-table__divider.validation-error'

test.describe('National data point: remove', () => {
  test.describe('one point', () => {
    test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

    test('NC deletes an invalid national data point and its errors go with it', async ({ authenticatedPage, ndp }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      await page.goto(extentOfForestPath)
      await DOMUtils.ensureEditingUnlocked(page)
      await TableDomUtils.clickOdpLink(page, {
        countryIso,
        sectionName: SectionNames.extentOfForest,
        year: seededYear,
      })

      // ==== a class without area puts an error on the point
      await NDPDomUtils.createNewNationalClassification(page, className)
      await expect(page.locator(areaCell)).toBeVisible({ timeout: Timeouts.medium })
      await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)

      await NDPDomUtils.deleteNationalDataPoint(page)
      await expect(page).toHaveURL(/\/sections\/extentOfForest$/)

      await expect(page.locator('.table-grid__odp-link', { hasText: String(seededYear) })).toHaveCount(0, {
        timeout: Timeouts.medium,
      })
      await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)

      // ==== nothing is stored for the deleted point
      const storedValidations = NdpApi.waitForValidations(page)
      await page.goto(extentOfForestPath)
      expect((await storedValidations)[ndp.uuid]).toBeUndefined()
    })
  })

  test.describe('two points', () => {
    test.use({
      ndpSeeds: [
        [
          { countryIso, nationalClasses: [], year: seededYear },
          { countryIso, nationalClasses: [], year: otherYear },
        ],
        { scope: 'test' },
      ],
    })

    test('NC deletes one of two invalid national data points and the other keeps its error', async ({
      authenticatedPage,
      ndps,
    }) => {
      const page = authenticatedPage
      const [keptNdp, deletedNdp] = ndps
      expect(keptNdp.id).toBeTruthy()
      expect(deletedNdp.id).toBeTruthy()

      // ==== a class without area on each point
      await page.goto(SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year: seededYear }))
      await DOMUtils.ensureEditingUnlocked(page)
      await NDPDomUtils.createNewNationalClassification(page, className)
      await expect(page.locator(areaCell)).toBeVisible({ timeout: Timeouts.medium })

      await page.goto(SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year: otherYear }))
      await DOMUtils.ensureEditingUnlocked(page)
      await NDPDomUtils.createNewNationalClassification(page, className)
      await expect(page.locator(areaCell)).toBeVisible({ timeout: Timeouts.medium })
      await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)

      await NDPDomUtils.deleteNationalDataPoint(page)
      await expect(page).toHaveURL(/\/sections\/extentOfForest$/)

      await expect(page.locator('.table-grid__odp-link', { hasText: String(otherYear) })).toHaveCount(0, {
        timeout: Timeouts.medium,
      })
      await expect(page.locator('.table-grid__odp-link', { hasText: String(seededYear) })).toBeVisible()
      await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)

      // ==== only the deleted point lost its stored errors
      const storedValidations = NdpApi.waitForValidations(page)
      await page.goto(extentOfForestPath)
      const stored = await storedValidations
      expect(stored[deletedNdp.uuid]).toBeUndefined()
      expect(Object.values(stored[keptNdp.uuid]?.nationalClasses ?? {})[0]?.area?.valid).toBe(false)
    })
  })
})
