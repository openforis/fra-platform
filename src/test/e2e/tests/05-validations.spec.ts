import { type Page } from '@playwright/test'
import other from 'i18n/resources/en/other.json'

import { type NodesBodyValue } from 'meta/api/request/cycleData/table'
import { type RecordTableValidationsState } from 'meta/assessment/validation/table'

import { expect, test } from '../fixtures/auth'
import { DOMUtils } from '../utils/DOM'

const assessmentName = 'fra'
const cycleName = '2025'

const targetCountryIso = 'X04' // Non-published country to test submit-to-review warning.
const crossCycleValidationCountryIso = 'ALB' // Non-atlantis country to test cross-cycle validations (see: shouldSkipValidationFormula.ts).

const targetCountryParams = { assessmentName, countryIso: targetCountryIso, cycleName }

const targetCountryPath = `/assessments/${assessmentName}/${cycleName}/${targetCountryIso}`
const extentOfForestPath = `${targetCountryPath}/sections/extentOfForest`
const forestAreaChangePath = `${targetCountryPath}/sections/forestAreaChange`
const printTablesPath = `${targetCountryPath}/print/tables`
const sendToReviewLabel = other.assessment.status.review.next
const submitToReviewWarning = other.navigation.submitToReviewWithErrorsWarning
const forestExtentSectionLabel = other.navigation.sectionHeaders.forestExtentCharacteristicsAndChanges

type PatchNodeValuesProps = {
  countryIso?: string
  cycleName?: string
  sectionName: string
  tableName: string
  values: Array<NodesBodyValue>
}

const _patchNodeValues = async (page: Page, props: PatchNodeValuesProps): Promise<void> => {
  const { countryIso = targetCountryIso, cycleName: cycleNameProp = cycleName, sectionName, tableName, values } = props
  const params = new URLSearchParams({ assessmentName, countryIso, cycleName: cycleNameProp })
  params.set('sectionName', sectionName)

  const response = await page.request.patch(`/api/cycle-data/table/nodes?${params.toString()}`, {
    data: { tableName, values },
  })
  expect(response.ok()).toBeTruthy()
}

const _waitForForestAreaNetChangeValidation = async (page: Page, props: { valid: boolean }): Promise<void> => {
  const { valid } = props
  await expect(async () => {
    const params = new URLSearchParams(targetCountryParams)
    params.set('sectionName', 'forestAreaChange')
    params.append('tableNames[]', 'forestAreaChange')
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
    await DOMUtils.unlockEditing(page)
    await expect(page.locator('.nav-header__status.actionable-true')).toBeVisible()
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

    await DOMUtils.unlockEditing(page)
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

  test('editing forestArea validates against the previous cycle', async ({ authenticatedPage }) => {
    const page = authenticatedPage
    const previousCycleForestArea2020 = '2000'

    // Seed 2020 extentOfForest value
    await _patchNodeValues(page, {
      countryIso: crossCycleValidationCountryIso,
      cycleName: '2020',
      sectionName: 'extentOfForest',
      tableName: 'extentOfForest',
      values: [{ colName: '2020', value: { raw: previousCycleForestArea2020 }, variableName: 'forestArea' }],
    })

    // Seed matching value in fra-2025 and assert no validation error
    await _patchNodeValues(page, {
      countryIso: crossCycleValidationCountryIso,
      sectionName: 'extentOfForest',
      tableName: 'extentOfForest',
      values: [{ colName: '2020', value: { raw: previousCycleForestArea2020 }, variableName: 'forestArea' }],
    })

    await page.goto(
      `/assessments/${assessmentName}/${cycleName}/${crossCycleValidationCountryIso}/sections/extentOfForest`
    )
    await expect(DOMUtils.tableContainer(page, 'extentOfForest')).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)
    await DOMUtils.expectCellHasNoValidationError(page, 'forestArea', '2020')

    // Change 2020 value from fra-2025 and assert validation error
    await DOMUtils.fillCell(page, 'forestArea', '2020', '1800')
    await DOMUtils.expectCellHasValidationError(page, 'forestArea', '2020')
    const currentCycleForestArea2020 = page.locator('[id$="variableName_forestArea_colName_2020"]')
    await expect(currentCycleForestArea2020).toHaveAttribute('data-tooltip-html', /differs from previously reported/)

    // Fix value and assert no validation error
    await DOMUtils.fillCell(page, 'forestArea', '2020', previousCycleForestArea2020)
    await DOMUtils.expectCellHasNoValidationError(page, 'forestArea', '2020')
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
