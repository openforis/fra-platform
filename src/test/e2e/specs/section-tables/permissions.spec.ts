import { mergeTests } from '@playwright/test'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { RoleName } from 'meta/user/role/name'
import { Numbers } from 'utils/numbers'

import { x01ExtentOfForest } from 'test/e2e/data/sectionTables'
import { test as tableTest } from 'test/e2e/fixtures/table'
import { test as userTest } from 'test/e2e/fixtures/user'
import { DOMUtils } from 'test/e2e/utils/dom'
import { TableDomUtils } from 'test/e2e/utils/table'

const test = mergeTests(tableTest, userTest)

const { countryIso } = x01ExtentOfForest

test.describe('Section tables: 1a - role permissions', () => {
  test.use({
    tableSeeds: [x01ExtentOfForest],
    userSeed: {
      assessmentName: AssessmentNames.fra,
      countryIso,
      cycleName: CycleNames._2025,
      role: RoleName.NATIONAL_CORRESPONDENT,
    },
  })

  test('NC edits cell in table 1a with correct and incorrect values', async ({ userPage }) => {
    const page = userPage

    // Navigate using sidebar and unlock editing
    await page.goto(`/assessments/${AssessmentNames.fra}/${CycleNames._2025}/${countryIso}/home`)
    await DOMUtils.sidebarNavigate(page, 'Forest extent, characteristics and changes', 'Extent of forest')
    await DOMUtils.ensureEditingUnlocked(page)

    // Clear table
    await TableDomUtils.clearTable(page, 'extentOfForest')
    await TableDomUtils.expectCellValue(page, 'forestArea', '1990', '')

    const totalLandArea = await TableDomUtils.getCellValue(page, 'totalLandArea', '1990')

    // Fill cell (forest area, 1990) with non-error value
    const forestAreaValue = 500
    await TableDomUtils.fillCell(page, 'forestArea', '1990', String(forestAreaValue))
    // Check calculation for other land updates and passes
    const expectedOtherLand = Numbers.toFixed(Numbers.sub(totalLandArea, forestAreaValue))
    await TableDomUtils.expectCellValue(page, 'otherLand', '1990', expectedOtherLand)
    // Expect no error
    await TableDomUtils.expectTableHasNoError(page, 'extentOfForest')

    // Fill cell (forest area, 1990) with error value
    const forestAreaValueError = 999999
    await TableDomUtils.fillCell(page, 'forestArea', '2000', String(forestAreaValueError))
    // Expect error (wait for validation to update)
    await TableDomUtils.expectTableHasError(page, 'extentOfForest')

    // Clear table
    await TableDomUtils.clearTable(page, 'extentOfForest')
    await TableDomUtils.expectCellValue(page, 'forestArea', '1990', '')
  })
})
