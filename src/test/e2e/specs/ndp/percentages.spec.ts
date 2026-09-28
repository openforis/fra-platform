import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import { NdpApi } from 'test/e2e/api/ndp'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const countryIso = 'X04'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })
const forestCharacteristicsPath = SectionUtils.path({
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
})

const seededYear = 2017
const ndp1aPath = SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year: seededYear })
const ndp1bPath = SectionUtils.ndpPath({
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
  year: seededYear,
})
const className = 'Forest land'

const classWithArea = { ...ODPNationalClassFactory.newNationalClass({ name: className }), area: '1000' }

// Valid 1a and 1b percentages, so both sub-tables show and only their percentages are left to fill
const classWithValidForestCharacteristics = {
  ...classWithArea,
  forestPercent: '60',
  otherWoodedLandPercent: '40',
  forestNaturalPercent: '50',
  forestPlantationPercent: '30',
  otherPlantedForestPercent: '20',
}

test.describe('National data point: percentages', () => {
  test.describe('forest and other wooded land', () => {
    test.use({ ndpSeeds: [{ countryIso, nationalClasses: [classWithArea], year: seededYear }] })

    test('NC enters forest and other wooded land percentages totalling exactly 100 and sees no error in 1a', async ({
      authenticatedPage,
      ndp,
    }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      await page.goto(ndp1aPath)
      await DOMUtils.ensureEditingUnlocked(page)

      await NDPDomUtils.fillNationalClassForestPercent(page, className, '60')
      await NDPDomUtils.fillNationalClassOWLPercent(page, className, '40') // totals to 100

      await expect(page.locator('td.fra-table__cell.validation-error')).toHaveCount(0, { timeout: 10000 })
      await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1a')).toHaveCount(0)

      await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)
      // A forest percentage above zero makes the 1b percentages required
      await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)

      // ==== forest above zero makes the 1b percentages required, so only the 1a field has to be clear
      const storedValidations = NdpApi.waitForValidations(page)
      await page.goto(ndp1aPath)
      const storedClassValidation = (await storedValidations)[ndp.uuid]?.nationalClasses?.[classWithArea.uuid]
      expect(storedClassValidation?.extentOfForestPercentage).toBeUndefined()
      await expect(page.locator('td.fra-table__cell.validation-error')).toHaveCount(0)
    })
  })

  test.describe('primary forest and plantation introduced', () => {
    test.use({
      ndpSeeds: [{ countryIso, nationalClasses: [classWithValidForestCharacteristics], year: seededYear }],
    })

    test('NC enters exactly 100 as the primary forest and introduced percentages and sees no error in 1b', async ({
      authenticatedPage,
      ndp,
    }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      await page.goto(ndp1bPath)
      await DOMUtils.ensureEditingUnlocked(page)

      await expect(NDPDomUtils.getNaturallyRegeneratingTable(page)).toBeVisible({ timeout: 10000 })
      await expect(NDPDomUtils.getPlantationTable(page)).toBeVisible({ timeout: 10000 })

      await NDPDomUtils.fillNationalClassPrimaryForestPercent(page, className, '100')
      await NDPDomUtils.fillNationalClassPlantationIntroducedPercent(page, className, '100')

      await expect(page.locator('td.fra-table__cell.validation-error')).toHaveCount(0, { timeout: 10000 })
      await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1b')).toHaveCount(0)

      await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)
      await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, false)

      // ==== nothing is stored for the class, so both percentages are valid on the server as well
      const storedValidations = NdpApi.waitForValidations(page)
      await page.goto(ndp1bPath)
      expect((await storedValidations)[ndp.uuid]?.nationalClasses).toBeUndefined()
      await expect(page.locator('td.fra-table__cell.validation-error')).toHaveCount(0)
    })
  })

  test.describe('forest percentage makes the 1b percentages required', () => {
    test.use({ ndpSeeds: [{ countryIso, nationalClasses: [classWithArea], year: seededYear }] })

    test('NC sets the forest percentage to 0 and the 1b error clears, then sets it above 0 and the error returns', async ({
      authenticatedPage,
      ndp,
    }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      await page.goto(ndp1aPath)
      await DOMUtils.ensureEditingUnlocked(page)

      // ==== forest above zero with empty 1b percentages puts the sum error on 1b
      await NDPDomUtils.fillNationalClassForestPercent(page, className, '60')
      await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)

      await NDPDomUtils.switchSection(page, {
        countryIso,
        sectionName: SectionNames.forestCharacteristics,
        year: seededYear,
      })
      const percentageCell = page.locator('.fra-table:not(.odp__sub-table) td.fra-table__cell.validation-error')
      await expect(percentageCell.first()).toBeVisible({ timeout: 10000 })
      await TooltipUtils.expectValidationTooltip(page, percentageCell.first(), `${className} sum must be equal to 100%`)
      await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1b')).toBeVisible()

      // ==== forest at zero drops the requirement
      await NDPDomUtils.switchSection(page, { countryIso, sectionName: SectionNames.extentOfForest, year: seededYear })
      await NDPDomUtils.fillNationalClassForestPercent(page, className, '0')
      await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, false)
      await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1b')).toHaveCount(0)

      // ==== the cleared state is what is stored, so it survives a reload
      const storedValidations = NdpApi.waitForValidations(page)
      await page.goto(ndp1bPath)
      const storedClassValidation = (await storedValidations)[ndp.uuid]?.nationalClasses?.[classWithArea.uuid]
      expect(storedClassValidation?.forestCharacteristicsPercentage).toBeUndefined()
      await expect(percentageCell).toHaveCount(0)
      await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, false)

      // ==== forest above zero again brings the requirement back
      await DOMUtils.ensureEditingUnlocked(page)
      await NDPDomUtils.switchSection(page, { countryIso, sectionName: SectionNames.extentOfForest, year: seededYear })
      await NDPDomUtils.fillNationalClassForestPercent(page, className, '60')
      await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)

      await NDPDomUtils.switchSection(page, {
        countryIso,
        sectionName: SectionNames.forestCharacteristics,
        year: seededYear,
      })
      await expect(percentageCell.first()).toBeVisible({ timeout: 10000 })
    })
  })
})
