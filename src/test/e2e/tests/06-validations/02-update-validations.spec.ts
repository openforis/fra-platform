import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'

import { expect, test } from 'test/e2e/fixtures/auth'
import { DOMUtils } from 'test/e2e/utils/dom'

import { sectionPath } from './helpers/navigation'
import { seedForestAreaNetChangeValidation } from './helpers/tables'

const countryIso = 'X04'

const extentOfForestPath = sectionPath({ countryIso, sectionName: SectionNames.extentOfForest })
const forestAreaChangePath = sectionPath({ countryIso, sectionName: 'forestAreaChange' })

test.describe.serial('Update validations', () => {
  test('clears validation errors after fixing the data', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await seedForestAreaNetChangeValidation(page, { countryIso, valid: false })
    await page.goto(forestAreaChangePath)
    await expect(DOMUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await DOMUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')
    await DOMUtils.expectTableHasError(page, TableNames.forestAreaChange)

    await seedForestAreaNetChangeValidation(page, { countryIso, valid: true })

    await DOMUtils.expectCellHasNoValidationError(page, 'forestAreaNetChange', '2020-2025')
  })

  test('editing extentOfForest updates forestAreaChange validation errors', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await seedForestAreaNetChangeValidation(page, { countryIso, valid: true })
    await page.goto(extentOfForestPath)
    await expect(DOMUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })

    await DOMUtils.unlockEditing(page)
    await DOMUtils.fillCell(page, 'forestArea', '2025', '1500')

    const targetSubSectionItem = page.locator(`.nav-section__item[href="${forestAreaChangePath}"]`)
    await expect(targetSubSectionItem.locator('.validation-error-indicator')).toBeVisible({ timeout: 20000 })

    await targetSubSectionItem.click()
    await expect(page).toHaveURL(/\/sections\/forestAreaChange$/)
    await expect(DOMUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await DOMUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')
    await DOMUtils.expectTableHasError(page, TableNames.forestAreaChange)

    await page.locator(`.nav-section__item[href="${extentOfForestPath}"]`).click()
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)
    await DOMUtils.fillCell(page, 'forestArea', '2025', '1000')

    await expect(targetSubSectionItem.locator('.validation-error-indicator')).toHaveCount(0, { timeout: 20000 })
    await targetSubSectionItem.click()
    await expect(page).toHaveURL(/\/sections\/forestAreaChange$/)
    await DOMUtils.expectCellHasNoValidationError(page, 'forestAreaNetChange', '2020-2025')
    await DOMUtils.expectTableHasNoError(page, TableNames.forestAreaChange)
  })
})
