import { TableNames } from 'meta/assessment/table'

import { x02ExtentOfForest, x02ExtentOfForestPath } from 'test/e2e/data/sectionTables'
import { test } from 'test/e2e/fixtures/table'
import { DOMUtils } from 'test/e2e/utils/dom'
import { TableDomUtils } from 'test/e2e/utils/table'

test.describe('Section tables: 1a - edit and clear table', () => {
  test.use({ tableSeeds: [x02ExtentOfForest] })

  test('NC edits table 1a', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x02ExtentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '1990', '1000')
    await cellSaved

    await TableDomUtils.clearTable(page, TableNames.extentOfForest)
    await TableDomUtils.expectCellValue(page, 'forestArea', '1990', '')
  })
})
