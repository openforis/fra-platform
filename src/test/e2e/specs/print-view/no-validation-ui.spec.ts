import { TableNames } from 'meta/assessment/table'

import { expect, test } from 'test/e2e/fixtures/auth'
import { x14ExtentOfForestPath, x14PrintTablesPath } from 'test/e2e/tests/08-section-tables.fixture'
import { DOMUtils } from 'test/e2e/utils/dom'
import { TableDomUtils } from 'test/e2e/utils/table'

test.describe.serial('Print view: no validation UI', () => {
  test('NC visits the print view and sees no validation errors', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x14ExtentOfForestPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.ensureEditingUnlocked(page)

    // Create validation error in table 1a
    const cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '-1')
    await cellSaved

    await page.goto(x14PrintTablesPath)
    await expect(page.locator('.print__container')).toBeVisible({ timeout: 20000 })

    await expect(page.locator('.data-validations')).toHaveCount(0)
    await TableDomUtils.expectCellHasNoValidationError(page, 'forestArea', '2025')

    await page.goto(x14ExtentOfForestPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.ensureEditingUnlocked(page)
    await TableDomUtils.clearTable(page, TableNames.extentOfForest)
  })
})
