import { Locator, Page } from '@playwright/test'

import { expect, test } from '../fixtures/auth'
import { DOMUtils } from '../utils/DOM'

const year = '2025'
const reference = 'https://example.com/e2e-reference'
const methodUsed = 'National Forest Inventory'
const comments = 'E2E test data source comments'

const dataSourceValueCell = (page: Page, label: string): Locator =>
  page.locator('.data-cell.header', { hasText: label }).locator('xpath=following-sibling::*[1]')

test.describe.serial('National data point: ', () => {
  test('NC creates a national data point and sees it back on the table', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto('/assessments/fra/2025/X01/home')
    await DOMUtils.sidebarNavigate(page, 'Forest extent, characteristics and changes', 'Extent of forest')
    await DOMUtils.unlockEditing(page)

    await page.getByRole('link', { name: 'Add national data point' }).click()

    // ======= YEAR
    await page.locator('.odp__year-selection .select__wrapper').click()
    await page.getByRole('option', { name: year }).click()

    // ======== DATA SOURCES
    // == Reference
    const referenceEditor = dataSourceValueCell(page, 'References').locator('[contenteditable="true"]')
    await referenceEditor.click()
    await page.keyboard.type(reference)
    await referenceEditor.blur()
    // == Methods
    await dataSourceValueCell(page, 'Methods used').locator('.select__wrapper').click()
    await page.getByRole('option', { name: methodUsed }).click()
    // == Additional comments
    await dataSourceValueCell(page, 'Additional comments').locator('textarea').fill(comments)

    await page.getByRole('link', { name: 'Done editing' }).first().click()

    // Back on the table, the new data point shows up as a year column header link
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)
    await expect(page.locator('.table-grid__odp-link', { hasText: year })).toBeVisible({ timeout: 10000 })
  })

  test('NC deletes the national data point', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto('/assessments/fra/2025/X01/sections/extentOfForest')
    await DOMUtils.unlockEditing(page)

    // Return to the created NDP page
    await page.locator('.table-grid__odp-link', { hasText: year }).click()
    await page.waitForURL(new RegExp(`/originalDataPoints/${year}/extentOfForest$`))

    page.once('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Delete' }).first().click()

    // Expect the link not to exist anymore
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)
    await expect(page.locator('.table-grid__odp-link', { hasText: year })).toHaveCount(0, { timeout: 10000 })
  })
})
