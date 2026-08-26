import { SectionNames } from 'meta/assessment/section'

import { NdpData } from 'test/e2e/data/ndp'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'

const countryIso = 'X01'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })

const fullYear = 2013
const bareYear = 2014
const bareYearNdpPath = SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year: bareYear })

test.describe('National data point: edit', () => {
  test.use({
    ndpSeeds: [
      [
        { countryIso, nationalClasses: NdpData.getDefaultClasses(), year: fullYear },
        { countryIso, nationalClasses: [], year: bareYear },
      ],
      { scope: 'test' },
    ],
  })

  test('NC prefills national classes from another year', async ({ authenticatedPage, ndps }) => {
    const page = authenticatedPage
    expect(ndps).toHaveLength(2)

    await page.goto(bareYearNdpPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await NDPDomUtils.prefillFromYear(page, String(fullYear))

    const classInputs = await page.locator('.data-cell.firstCol input.input-text').all()
    const classInputValues = await Promise.all(classInputs.map((input) => input.inputValue()))
    expect(classInputValues).toEqual(['Forest', 'Other land', 'Other wooded land'])

    // Prefill copies only names and percentages, but not area!
    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const year = String(bareYear)
    await TableDomUtils.expectCellValue(page, 'forestArea', year, '')
    await TableDomUtils.expectCellReadOnly(page, 'forestArea', year)
  })
})
