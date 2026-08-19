import { SectionNames } from 'meta/assessment/section'

import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'

const countryIso = 'X10'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })
const forestCharacteristicsPath = SectionUtils.path({
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
})

const seededYear = 2015
const ndp1aPath = SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year: seededYear })
const className = 'Forest land'

test.describe('National data point: extent of forest - success', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

  test('NC fills a national class with valid data and sees no validation errors', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await NDPDomUtils.createNewNationalClassification(page, className)
    await NDPDomUtils.fillNationalClassArea(page, className, '1000')
    await NDPDomUtils.fillNationalClassForestPercent(page, className, '60')
    await NDPDomUtils.fillNationalClassOWLPercent(page, className, '30') // totals to 90

    await expect(page.locator('.data-cell.validation-error')).toHaveCount(0, { timeout: 10000 })
    await expect(page.locator('td.fra-table__cell.validation-error')).toHaveCount(0, { timeout: 10000 })

    await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)

    // A forest percentage above zero makes the 1b percentages required
    await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)
  })
})
