import { SectionNames } from 'meta/assessment/section'

import { NdpApi, type NdpSeed } from 'test/e2e/api/ndp'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'

const countryIso = 'X02'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })

const seededYear = 2015
const otherYear = 2016
const ndpPath = (year: number): string =>
  SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year })
const className = 'Forest land'

const areaCell = 'td.fra-table__cell.fra-table__divider.validation-error'

test.describe('National data point: year', () => {
  test.describe('year change', () => {
    test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

    // The point moves to the other year, so the fixture teardown of the seeded year doesn't reach it
    const movedSeed: NdpSeed = { countryIso, nationalClasses: [], year: otherYear }

    test.beforeEach(async ({ authenticatedPage }) => {
      await NdpApi.removeIfExists(authenticatedPage, movedSeed)
    })

    test.afterEach(async ({ authenticatedPage }) => {
      await NdpApi.removeIfExists(authenticatedPage, movedSeed)
    })

    test('NC changes the year of an invalid national data point and the error stays', async ({
      authenticatedPage,
      ndp,
    }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      await page.goto(ndpPath(seededYear))
      await DOMUtils.ensureEditingUnlocked(page)

      // ==== a class without area puts an error on the point
      await NDPDomUtils.createNewNationalClassification(page, className)
      await expect(page.locator(areaCell)).toBeVisible({ timeout: 10000 })
      await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)

      await NDPDomUtils.changeYear(page, String(otherYear))
      await expect(page).toHaveURL(new RegExp(`${ndpPath(otherYear)}$`))
      await expect(page.locator(areaCell)).toBeVisible()
      await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)

      // ==== the point keeps its uuid, so the stored error is still there under the new year
      const storedValidations = NdpApi.waitForValidations(page)
      await page.goto(ndpPath(otherYear))
      const storedClasses = Object.values((await storedValidations)[ndp.uuid]?.nationalClasses ?? {})
      expect(storedClasses[0]?.area?.valid).toBe(false)
      await expect(page.locator(areaCell)).toBeVisible()
      await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)
    })
  })

  test.describe('occupied year', () => {
    test.use({
      ndpSeeds: [
        [
          { countryIso, nationalClasses: [], year: seededYear },
          { countryIso, nationalClasses: [], year: otherYear },
        ],
        { scope: 'test' },
      ],
    })

    test('NC cannot select the year of another national data point', async ({ authenticatedPage, ndps }) => {
      const page = authenticatedPage
      expect(ndps).toHaveLength(2)

      await page.goto(ndpPath(seededYear))
      await DOMUtils.ensureEditingUnlocked(page)

      await NDPDomUtils.openYearSelection(page)
      await expect(page.getByRole('option', { name: String(otherYear), exact: true })).toBeDisabled()
      await expect(page.getByRole('option', { name: '2017', exact: true })).toBeEnabled()
    })
  })
})
