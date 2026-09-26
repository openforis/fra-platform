import { x14ExtentOfForest, x14PrintTablesPath } from 'test/e2e/data/sectionTables'
import { expect, test } from 'test/e2e/fixtures/table'
import { TableDomUtils } from 'test/e2e/utils/table'

test.describe('Print view: no validation UI', () => {
  // Table 1a gets a validation error (negative forestArea), the print view must not show it
  test.use({
    tableSeeds: [{ ...x14ExtentOfForest, values: [{ colName: '2025', value: '-1', variableName: 'forestArea' }] }],
  })

  test('NC visits the print view and sees no validation errors', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x14PrintTablesPath)
    await expect(page.locator('.print__container')).toBeVisible({ timeout: 20000 })

    await expect(page.locator('.data-validations')).toHaveCount(0)
    await TableDomUtils.expectCellHasNoValidationError(page, 'forestArea', '2025')
  })
})
