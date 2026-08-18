import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const countryIso = 'X18'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })
const forestCharacteristicsPath = SectionUtils.path({
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
})

const seededYear = 2015
const url1aRegex = new RegExp(`/originalDataPoints/${seededYear}/extentOfForest$`)
const className = 'Forest land'

const namedClassWithArea = { ...ODPNationalClassFactory.newNationalClass({ name: className }), area: '1000' }

test.describe('National data point: extent of forest - failure', () => {
  test.describe('empty national class name', () => {
    test.use({ ndpSeeds: [{ countryIso, nationalClasses: [namedClassWithArea], year: seededYear }] })

    test('NC clears the national class name and sees the error in both 1a and 1b', async ({
      authenticatedPage,
      ndp,
    }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      await page.goto(extentOfForestPath)
      await DOMUtils.ensureEditingUnlocked(page)
      await TableDomUtils.clickOdpLink(page, String(seededYear), url1aRegex)

      await NDPDomUtils.editNationalClassification(page, '')

      const nameCell = page.locator('.data-cell.validation-error')
      await expect(nameCell).toBeVisible({ timeout: 10000 })
      await TooltipUtils.expectValidationTooltip(page, nameCell, 'Value cannot be empty')

      // Check for error flag in navigation for both 1a and 1b
      await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)
      await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)
    })
  })

  test.describe('empty national class area', () => {
    test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

    test('NC leaves the national class area empty and sees the error in 1a', async ({ authenticatedPage, ndp }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      await page.goto(extentOfForestPath)
      await DOMUtils.ensureEditingUnlocked(page)
      await TableDomUtils.clickOdpLink(page, String(seededYear), url1aRegex)

      await NDPDomUtils.createNewNationalClassification(page, className)

      const areaCell = page.locator('td.fra-table__cell.fra-table__divider.validation-error')
      await expect(areaCell).toBeVisible({ timeout: 10000 })
      await TooltipUtils.expectValidationTooltip(page, areaCell, 'Value cannot be empty')

      // Check for error flag in navigation for 1a - 1b show not have an error
      await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)
      await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, false)
    })
  })

  test.describe('percentages over 100', () => {
    test.use({ ndpSeeds: [{ countryIso, nationalClasses: [namedClassWithArea], year: seededYear }] })

    test('NC enters forest and other wooded land percentages over 100 and sees the error in 1a', async ({
      authenticatedPage,
      ndp,
    }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      await page.goto(extentOfForestPath)
      await DOMUtils.ensureEditingUnlocked(page)
      await TableDomUtils.clickOdpLink(page, String(seededYear), url1aRegex)

      await NDPDomUtils.fillNationalClassForestPercent(page, className, '60')
      await NDPDomUtils.fillNationalClassOWLPercent(page, className, '50') // totals to 110

      const percentageCell = page.locator('td.fra-table__cell.validation-error')
      await expect(percentageCell.first()).toBeVisible({ timeout: 10000 })
      await TooltipUtils.expectValidationTooltip(
        page,
        percentageCell.first(),
        `${className} should be not greater than 100%`
      )

      // Check for error flag in navigation for 1a - 1b show not have an error
      await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)
    })
  })
})
