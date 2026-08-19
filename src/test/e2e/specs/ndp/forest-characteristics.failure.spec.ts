import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const countryIso = 'X19'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })
const forestCharacteristicsPath = SectionUtils.path({ countryIso, sectionName: SectionNames.forestCharacteristics })

const seededYear = 2015
const ndp1bPath = SectionUtils.ndpPath({
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
  year: seededYear,
})
const className = 'Forest land'

// When forestPercent is above zero, 1b percentages become required
const classWithForestPercent = {
  ...ODPNationalClassFactory.newNationalClass({ name: className }),
  area: '1000',
  forestPercent: '60',
}

// Seed correct values to avoid errors in 1b: total to 100%
const classWithValidForestCharacteristics = {
  ...classWithForestPercent,
  forestNaturalPercent: '50',
  forestPlantationPercent: '30',
  otherPlantedForestPercent: '20',
}

test.describe('National data point: forest characteristics - failure', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(ndp1bPath)
    await DOMUtils.ensureEditingUnlocked(page)
  })

  test.describe('percentages not equal to 100', () => {
    test.use({ ndpSeeds: [{ countryIso, nationalClasses: [classWithForestPercent], year: seededYear }] })

    test('NC enters forest characteristics percentages that do not total 100 and sees the error in 1b', async ({
      authenticatedPage,
      ndp,
    }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      await NDPDomUtils.fillNationalClassNaturalForestPercent(page, className, '50')
      await NDPDomUtils.fillNationalClassPlantationForestPercent(page, className, '30')
      await NDPDomUtils.fillNationalClassOtherPlantedForestPercent(page, className, '10') // totals to 90

      const percentageCell = page.locator('.fra-table:not(.odp__sub-table) td.fra-table__cell.validation-error')
      await expect(percentageCell.first()).toBeVisible({ timeout: 10000 })
      await TooltipUtils.expectValidationTooltip(page, percentageCell.first(), `${className} sum must be equal to 100%`)

      // Check for error flag in navigation for 1b - the 1a values stay valid
      await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)
      await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)
    })
  })

  test.describe('plantation introduced percentage over 100', () => {
    test.use({
      ndpSeeds: [{ countryIso, nationalClasses: [classWithValidForestCharacteristics], year: seededYear }],
    })

    test('NC enters an introduced percentage over 100 and sees the error in 1b', async ({ authenticatedPage, ndp }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      const plantationTable = NDPDomUtils.getPlantationTable(page)
      await expect(plantationTable).toBeVisible()

      await NDPDomUtils.fillNationalClassPlantationIntroducedPercent(page, className, '110')

      const introducedCell = plantationTable.locator('td.fra-table__cell.validation-error')
      await expect(introducedCell).toBeVisible({ timeout: 10000 })
      await TooltipUtils.expectValidationTooltip(page, introducedCell, `${className} should be not greater than 100%`)

      await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)
    })
  })

  test.describe('primary forest percentage over 100', () => {
    test.use({
      ndpSeeds: [{ countryIso, nationalClasses: [classWithValidForestCharacteristics], year: seededYear }],
    })

    test('NC enters a primary forest percentage over 100 and sees the error in 1b', async ({
      authenticatedPage,
      ndp,
    }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      const naturallyRegeneratingTable = NDPDomUtils.getNaturallyRegeneratingTable(page)
      await expect(naturallyRegeneratingTable).toBeVisible()

      await NDPDomUtils.fillNationalClassPrimaryForestPercent(page, className, '110')

      const primaryForestCell = naturallyRegeneratingTable.locator('td.fra-table__cell.validation-error')
      await expect(primaryForestCell).toBeVisible({ timeout: 10000 })
      await TooltipUtils.expectValidationTooltip(
        page,
        primaryForestCell,
        `${className} should be not greater than 100%`
      )

      await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)
    })
  })
})
