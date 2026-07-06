import { TableNames } from 'meta/assessment/table'

import { expect, test } from '../fixtures/auth'
import { DOMUtils } from '../utils/dom'
import { TableDomUtils } from '../utils/table'
import { sectionPath, x01PrintTablesPath } from './08-section-tables.fixture'

test.describe.serial('Print view: no validation UI', () => {
  test('NC visits the print view and sees no validation errors', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(sectionPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)

    // Create validation error in table 1a
    const cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '-1')
    await cellSaved

    await page.goto(x01PrintTablesPath)
    await expect(page.locator('.print__container')).toBeVisible({ timeout: 20000 })

    await expect(page.locator('.data-validations')).toHaveCount(0)
    await TableDomUtils.expectCellHasNoValidationError(page, 'forestArea', '2025')

    await page.goto(sectionPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)
    await TableDomUtils.clearTable(page, TableNames.extentOfForest)
  })
})
