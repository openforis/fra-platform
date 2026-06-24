import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'

import { expect, test } from 'test/e2e/fixtures/auth'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NodeValues } from 'test/e2e/utils/NodeValues'

import { sectionPath } from './helpers/navigation'
import { expectValidationTooltip } from './helpers/tooltips'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const countryIso = 'ALB' // Non-atlantis country to test cross-cycle validations (see: shouldSkipValidationFormula.ts).
const previousCycleForestArea2020 = '2000'

test.describe.serial('Cross-cycle validations', () => {
  test('editing forestArea validates against the previous cycle', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    // Seed 2020 extentOfForest value
    await NodeValues.patch(page, {
      assessmentName,
      countryIso,
      cycleName: CycleNames._2020,
      sectionName: SectionNames.extentOfForest,
      tableName: TableNames.extentOfForest,
      values: [{ colName: '2020', value: { raw: previousCycleForestArea2020 }, variableName: 'forestArea' }],
    })

    // Seed matching value in fra-2025 and assert no validation error
    await NodeValues.patch(page, {
      assessmentName,
      countryIso,
      cycleName,
      sectionName: SectionNames.extentOfForest,
      tableName: TableNames.extentOfForest,
      values: [{ colName: '2020', value: { raw: previousCycleForestArea2020 }, variableName: 'forestArea' }],
    })

    await page.goto(sectionPath({ countryIso, sectionName: SectionNames.extentOfForest }))
    await expect(DOMUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)
    await DOMUtils.expectCellHasNoValidationError(page, 'forestArea', '2020')

    // Change 2020 value from fra-2025 and assert validation error
    await DOMUtils.fillCell(page, 'forestArea', '2020', '1800')
    await DOMUtils.expectCellHasValidationError(page, 'forestArea', '2020')

    const currentCycleForestArea2020 = page.locator('[id$="variableName_forestArea_colName_2020"]')
    await expectValidationTooltip(page, {
      locator: currentCycleForestArea2020,
      text: 'differs from previously reported',
    })

    // Fix value and assert no validation error
    await DOMUtils.fillCell(page, 'forestArea', '2020', previousCycleForestArea2020)
    await DOMUtils.expectCellHasNoValidationError(page, 'forestArea', '2020')
  })
})
