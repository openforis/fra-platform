import other from 'i18n/resources/en/other.json'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { expect, test } from 'test/e2e/fixtures/auth'
import { DOMUtils } from 'test/e2e/utils/dom'

import { expectNavigationError, sectionPath } from './helpers/navigation'
import { expectSubmitToReviewWarning } from './helpers/review'
import { seedForestAreaNetChangeValidation } from './helpers/tables'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
// Non-published country without 2020/2025 ODP rows; ODP data masks seeded extentOfForest values during validation.
const countryIso = 'X06'
const sectionName = 'forestAreaChange'
const sectionHeader = other.navigation.sectionHeaders.forestExtentCharacteristicsAndChanges

const forestAreaChangePath = sectionPath({ countryIso, sectionName })
const printTablesPath = `/assessments/${assessmentName}/${cycleName}/${countryIso}/print/tables`

test.describe.serial('Rendering validations', () => {
  test('shows validation errors on initial load', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await seedForestAreaNetChangeValidation(page, { countryIso, valid: false })
    await page.goto(forestAreaChangePath)
    await expect(DOMUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })

    await DOMUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')
    await DOMUtils.expectTableHasError(page, TableNames.forestAreaChange)

    await expectNavigationError(page, { countryIso, hasError: true, sectionHeader, sectionName })
    await expectSubmitToReviewWarning(page, { present: true })
  })

  test('does not show validation UI on the print route', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await seedForestAreaNetChangeValidation(page, { countryIso, valid: false })

    await page.goto(printTablesPath)
    await expect(DOMUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await expect(DOMUtils.tableValidationErrors(page, TableNames.forestAreaChange)).toHaveCount(0)
    await expect(page.locator('.validation-error-indicator')).toHaveCount(0)
    await DOMUtils.expectCellHasNoValidationError(page, 'forestAreaNetChange', '2020-2025')
  })
})
