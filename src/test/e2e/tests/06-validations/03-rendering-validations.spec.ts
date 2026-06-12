import other from 'i18n/resources/en/other.json'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { expect, test } from 'test/e2e/fixtures/auth'
import { DOMUtils } from 'test/e2e/utils/DOM'

import { seedForestAreaNetChangeValidation } from './helpers/tables'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
// Non-published country without 2020/2025 ODP rows; ODP data masks seeded extentOfForest values during validation.
const countryIso = 'X06'

const forestExtentSectionLabel = other.navigation.sectionHeaders.forestExtentCharacteristicsAndChanges
const sendToReviewLabel = other.assessment.status.review.next
const submitToReviewWarning = other.navigation.submitToReviewWithErrorsWarning

const countryPath = `/assessments/${assessmentName}/${cycleName}/${countryIso}`
const forestAreaChangePath = `${countryPath}/sections/forestAreaChange`
const printTablesPath = `${countryPath}/print/tables`

test.describe.serial('Rendering validations', () => {
  test('shows validation errors on initial load', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await seedForestAreaNetChangeValidation(page, { countryIso, valid: false })
    await page.goto(forestAreaChangePath)
    await expect(DOMUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })

    await DOMUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')
    await DOMUtils.expectTableHasError(page, TableNames.forestAreaChange)

    const subSectionItem = page.locator(`.nav-section__item[href="${forestAreaChangePath}"]`)
    const sectionHeader = page.locator('.nav-section__header', { hasText: forestExtentSectionLabel })

    await expect(subSectionItem.locator('.validation-error-indicator')).toBeVisible()
    await sectionHeader.click()
    await expect(sectionHeader.locator('.validation-error-indicator')).toBeVisible()

    // Open the Submit to Review modal
    await DOMUtils.unlockEditing(page)
    await expect(page.locator('.nav-header__status.actionable-true')).toBeVisible()
    await page.locator('.nav-header__status.actionable-true').click()
    await page.getByText(sendToReviewLabel).click()
    await expect(page.locator('.modal')).toBeVisible()
    await expect(page.getByText(submitToReviewWarning)).toBeVisible()
    await page.getByRole('button', { name: 'Cancel' }).click()
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
