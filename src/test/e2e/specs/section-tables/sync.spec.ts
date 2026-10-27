import { TableNames } from 'meta/assessment/table'

import { Timeouts } from 'test/e2e/config/timeouts'
import { x12ForestAreaChange, x12ForestAreaChangePath } from 'test/e2e/data/sectionTables'
import { expect, test } from 'test/e2e/fixtures/table'
import { DOMUtils } from 'test/e2e/utils/dom'
import { TableDomUtils } from 'test/e2e/utils/table'

const variableName = 'forest_expansion'
const colName = '2020-2025'

test.describe('Section tables: sync between clients', () => {
  test.use({ tableSeeds: [x12ForestAreaChange] })

  test('another client viewing the table sees its edits', async ({
    authenticatedPage: page,
    otherAuthenticatedPage: otherPage,
  }) => {
    await page.goto(x12ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({
      timeout: Timeouts.extraLong,
    })
    await DOMUtils.ensureEditingUnlocked(page)
    await otherPage.goto(x12ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(otherPage, TableNames.forestAreaChange)).toBeVisible({
      timeout: Timeouts.extraLong,
    })
    await DOMUtils.ensureEditingUnlocked(otherPage)

    const cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, variableName, colName, '123')
    await cellSaved

    await TableDomUtils.expectCellValue(otherPage, variableName, colName, '123')

    // ==== the editing client keeps its own edits
    await TableDomUtils.expectCellValue(page, variableName, colName, '123')
  })
})
