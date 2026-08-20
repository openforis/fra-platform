import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'

const countryIso = 'X17'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })
const forestCharacteristicsPath = SectionUtils.path({
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
})

const seededYear = 2015
const ndp1bPath = SectionUtils.ndpPath({
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
  year: seededYear,
})
const className = 'Forest land'

// Valid section 1a data, which make the 1b percentages required
const classWithForestPercent = {
  ...ODPNationalClassFactory.newNationalClass({ name: className }),
  area: '1000',
  forestPercent: '60',
  otherWoodedLandPercent: '30',
}

test.describe('National data point: forest characteristics - success', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [classWithForestPercent], year: seededYear }] })

  test('NC fills the forest characteristics percentages and clears the error left by 1a', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1bPath)
    await DOMUtils.ensureEditingUnlocked(page)

    // Each sub-table appears conditionally when parent table value is filled
    const naturallyRegeneratingTable = NDPDomUtils.getNaturallyRegeneratingTable(page)
    const plantationTable = NDPDomUtils.getPlantationTable(page)

    // Initial state: both hidden
    await expect(naturallyRegeneratingTable).toBeHidden()
    await expect(plantationTable).toBeHidden()

    // == Filling Natural Forest makes Naturally Regenerating table visible
    await NDPDomUtils.fillNationalClassNaturalForestPercent(page, className, '50')
    await expect(naturallyRegeneratingTable).toBeVisible()
    await expect(plantationTable).toBeHidden()

    // The 1a values stay valid, while the 1b percentages do not total 100 yet
    await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)
    await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)

    // == Filling Plantation Forest makes Plantation table visible
    await NDPDomUtils.fillNationalClassPlantationForestPercent(page, className, '30')
    await expect(plantationTable).toBeVisible()

    await NDPDomUtils.fillNationalClassOtherPlantedForestPercent(page, className, '20') // totals to 100

    await NDPDomUtils.fillNationalClassPrimaryForestPercent(page, className, '50')
    await NDPDomUtils.fillNationalClassPlantationIntroducedPercent(page, className, '50')

    await expect(page.locator('td.fra-table__cell.validation-error')).toHaveCount(0, { timeout: 10000 })

    await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)
    await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, false)

    // Done editing on the 1b tab returns to section 1b, not to 1a
    await NDPDomUtils.doneEditing(page)
    await expect(page).toHaveURL(new RegExp(`${forestCharacteristicsPath}$`))
  })
})
