import { type Page } from '@playwright/test'
import other from 'i18n/resources/en/other.json'

import { type NodesBodyValue } from 'meta/api/request/cycleData/table'
import { type RecordTableValidationsState } from 'meta/assessment/validation/table'

import { expect, test } from '../fixtures/auth'
import { DOMUtils } from '../utils/DOM'

const assessmentName = 'fra'
const countryIso = 'X02'
const cycleName = '2025'

const countryParams = { assessmentName, countryIso, cycleName }

const baseCountryPath = `/assessments/${assessmentName}/${cycleName}/${countryIso}`
const extentOfForestPath = `${baseCountryPath}/sections/extentOfForest`
const forestAreaChangePath = `${baseCountryPath}/sections/forestAreaChange`
const printTablesPath = `${baseCountryPath}/print/tables`
const sendToReviewLabel = other.assessment.status.review.next
const submitToReviewWarning = other.navigation.submitToReviewWithErrorsWarning
const forestExtentSectionLabel = other.navigation.sectionHeaders.forestExtentCharacteristicsAndChanges

const _patchNodeValues = async (
  page: Page,
  props: { sectionName: string; tableName: string; values: Array<NodesBodyValue> }
): Promise<void> => {
  const { sectionName, tableName, values } = props
  const params = new URLSearchParams(countryParams)
  params.set('sectionName', sectionName)

  const response = await page.request.patch(`/api/cycle-data/table/nodes?${params.toString()}`, {
    data: { tableName, values },
  })
  expect(response.ok()).toBeTruthy()
}

const _waitForForestAreaNetChangeValidation = async (page: Page, props: { valid: boolean }): Promise<void> => {
  const { valid } = props
  await expect(async () => {
    const params = new URLSearchParams(countryParams)
    params.append('tableNames', 'forestAreaChange')
    const response = await page.request.get(`/api/cycle-data/validations/table-data?${params.toString()}`)

    expect(response.ok()).toBeTruthy()

    const validations = (await response.json()) as RecordTableValidationsState
    const validation = validations.forestAreaChange?.['2020-2025']?.forestAreaNetChange

    expect(validation?.valid === false).toBe(!valid)
    expect(validations.forestAreaChange?.['2025']?.forestAreaNetChange).toBeUndefined()
  }).toPass({ timeout: 20000 })
}

const _seedForestAreaNetChangeValidation = async (page: Page, props: { valid: boolean }): Promise<void> => {
  const { valid } = props
  const forestArea2020 = '1000'
  const forestArea2025 = valid ? '1000' : '1500'
  const forestAreaNetChange = '0'

  await _patchNodeValues(page, {
    sectionName: 'extentOfForest',
    tableName: 'extentOfForest',
    values: [
      { colName: '2020', value: { raw: forestArea2020 }, variableName: 'forestArea' },
      { colName: '2025', value: { raw: forestArea2025 }, variableName: 'forestArea' },
    ],
  })

  await _patchNodeValues(page, {
    sectionName: 'forestAreaChange',
    tableName: 'forestAreaChange',
    values: [{ colName: '2020-2025', value: { raw: forestAreaNetChange }, variableName: 'forestAreaNetChange' }],
  })

  await _waitForForestAreaNetChangeValidation(page, { valid })
}

test.describe.serial('Backend validations', () => {
  test('shows validation errors on initial load', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await _seedForestAreaNetChangeValidation(page, { valid: false })
    await page.goto(forestAreaChangePath)
    await expect(DOMUtils.tableContainer(page, 'forestAreaChange')).toBeVisible({ timeout: 20000 })

    await DOMUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')
    await DOMUtils.expectTableHasError(page, 'forestAreaChange')

    const subSectionItem = page.locator(`.nav-section__item[href="${forestAreaChangePath}"]`)
    const sectionHeader = page.locator('.nav-section__header', { hasText: forestExtentSectionLabel })

    await expect(subSectionItem.locator('.validation-error-indicator')).toBeVisible()
    await sectionHeader.click()
    await expect(sectionHeader.locator('.validation-error-indicator')).toBeVisible()

    // Open the Submit to Review modal
    await page.locator('.nav-header__status.actionable-true').click()
    await page.getByText(sendToReviewLabel).click()
    await expect(page.locator('.modal')).toBeVisible()
    await expect(page.getByText(submitToReviewWarning)).toBeVisible()
    await page.getByRole('button', { name: 'Cancel' }).click()
  })

  test('clears validation errors after fixing the data', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await _seedForestAreaNetChangeValidation(page, { valid: false })
    await page.goto(forestAreaChangePath)
    await expect(DOMUtils.tableContainer(page, 'forestAreaChange')).toBeVisible({ timeout: 20000 })
    await DOMUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')
    await DOMUtils.expectTableHasError(page, 'forestAreaChange')

    await _seedForestAreaNetChangeValidation(page, { valid: true })

    await DOMUtils.expectCellHasNoValidationError(page, 'forestAreaNetChange', '2020-2025')
  })

  test('editing extentOfForest updates forestAreaChange validation errors', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await _seedForestAreaNetChangeValidation(page, { valid: true })
    await page.goto(extentOfForestPath)
    await expect(DOMUtils.tableContainer(page, 'extentOfForest')).toBeVisible({ timeout: 20000 })

    await DOMUtils.fillCell(page, 'forestArea', '2025', '1500')

    const targetSubSectionItem = page.locator(`.nav-section__item[href="${forestAreaChangePath}"]`)
    await expect(targetSubSectionItem.locator('.validation-error-indicator')).toBeVisible({ timeout: 20000 })

    await targetSubSectionItem.click()
    await expect(page).toHaveURL(/\/sections\/forestAreaChange$/)
    await expect(DOMUtils.tableContainer(page, 'forestAreaChange')).toBeVisible({ timeout: 20000 })
    await DOMUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')
    await DOMUtils.expectTableHasError(page, 'forestAreaChange')

    await page.locator(`.nav-section__item[href="${extentOfForestPath}"]`).click()
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)
    await DOMUtils.fillCell(page, 'forestArea', '2025', '1000')

    await expect(targetSubSectionItem.locator('.validation-error-indicator')).toHaveCount(0, { timeout: 20000 })
    await targetSubSectionItem.click()
    await expect(page).toHaveURL(/\/sections\/forestAreaChange$/)
    await DOMUtils.expectCellHasNoValidationError(page, 'forestAreaNetChange', '2020-2025')
    await DOMUtils.expectTableHasNoError(page, 'forestAreaChange')
  })

  test('does not show validation UI on the print route', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await _seedForestAreaNetChangeValidation(page, { valid: false })

    await page.goto(printTablesPath)
    await expect(DOMUtils.tableContainer(page, 'forestAreaChange')).toBeVisible({ timeout: 20000 })
    await expect(DOMUtils.tableValidationErrors(page, 'forestAreaChange')).toHaveCount(0)
    await expect(page.locator('.validation-error-indicator')).toHaveCount(0)
    await DOMUtils.expectCellHasNoValidationError(page, 'forestAreaNetChange', '2020-2025')
  })
})
