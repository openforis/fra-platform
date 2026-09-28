import { SectionNames } from 'meta/assessment/section'

import { NdpApi } from 'test/e2e/api/ndp'
import { NdpData } from 'test/e2e/data/ndp'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

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

    // ==== the copied classes have no area, so every one of them is marked in 1a
    const areaCells = page.locator('td.fra-table__cell.fra-table__divider.validation-error')
    await expect(areaCells).toHaveCount(3, { timeout: 10000 })
    await TooltipUtils.expectValidationTooltip(page, areaCells.first(), 'Value cannot be empty')
    await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1a')).toBeVisible()

    // Prefill copies only names and percentages, but not area!
    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const year = String(bareYear)
    await TableDomUtils.expectCellValue(page, 'forestArea', year, '')
    await TableDomUtils.expectCellReadOnly(page, 'forestArea', year)

    // ==== filling one area clears only that class
    await page.goto(bareYearNdpPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await NDPDomUtils.fillNationalClassArea(page, 'Forest', '22543')
    await expect(NDPDomUtils.getNationalClassAreaCell(page, 'Forest')).not.toHaveClass(/validation-error/, {
      timeout: 10000,
    })
    await expect(areaCells).toHaveCount(2)
    await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1a')).toBeVisible()

    // ==== filling the remaining areas clears the 1a error of the point
    await NDPDomUtils.fillNationalClassArea(page, 'Other land', '7099')
    await NDPDomUtils.fillNationalClassArea(page, 'Other wooded land', '752')
    await expect(areaCells).toHaveCount(0, { timeout: 10000 })
    await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1a')).toHaveCount(0)

    // ==== no area error is stored for any of the copied classes
    const [, bareNdp] = ndps
    const storedValidations = NdpApi.waitForValidations(page)
    await page.goto(bareYearNdpPath)
    const storedClasses = Object.values((await storedValidations)[bareNdp.uuid]?.nationalClasses ?? {})
    expect(storedClasses.filter((storedClass) => storedClass.area)).toHaveLength(0)
    await expect(areaCells).toHaveCount(0)
  })

  test('NC edits a complete national data point with multiple national classes', async ({
    authenticatedPage,
    ndps,
  }) => {
    const page = authenticatedPage
    const [fullNdp] = ndps
    expect(fullNdp.id).toBeTruthy()

    const editedYearNdpPath = SectionUtils.ndpPath({
      countryIso,
      sectionName: SectionNames.extentOfForest,
      year: fullYear,
    })
    await page.goto(editedYearNdpPath)
    await DOMUtils.ensureEditingUnlocked(page)

    // comments
    await NDPDomUtils.fillDataSourcesV1Reference(page, NdpData.getDefaultDataSourcesV1Reference())
    await NDPDomUtils.fillDataSourcesV1MethodsUsed(page, NdpData.getDefaultDataSourcesV1Method())
    await NDPDomUtils.fillDataSourcesV1AdditionalComments(page, NdpData.getDefaultDataSourcesV1Comments())
    await NDPDomUtils.fillComments(page, NdpData.getDefaultComments())

    // data
    await NDPDomUtils.fillNationalClassArea(page, 'Forest', '30000')
    await NDPDomUtils.fillNationalClassArea(page, 'Other wooded land', '1000')
    await NDPDomUtils.fillNationalClassForestPercent(page, 'Other land', '50')
    await NDPDomUtils.fillNationalClassOWLPercent(page, 'Other land', '20')

    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const year = String(fullYear)
    await TableDomUtils.expectCellValue(page, 'forestArea', year, '33549.50')
    await TableDomUtils.expectCellValue(page, 'otherWoodedLand', year, '2419.80')
  })
})
