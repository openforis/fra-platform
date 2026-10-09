import { TableNames } from 'meta/assessment/table'

import {
  albExtentOfForest,
  albExtentOfForest2020,
  albSectionPath,
  x06ExtentOfForest,
  x06ExtentOfForestPath,
  x07ExtentOfForest,
  x07ExtentOfForestPath,
  x07ForestAreaChange,
  x07ForestAreaChangePath,
} from 'test/e2e/data/sectionTables'
import { expect, test } from 'test/e2e/fixtures/table'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { TableDomUtils } from 'test/e2e/utils/table'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

test.describe('Section tables: 1a - forestArea change triggers net change error in 1d', () => {
  test.use({
    tableSeeds: [
      [
        {
          ...x07ExtentOfForest,
          values: [
            { colName: '2020', value: '1000', variableName: 'forestArea' },
            { colName: '2025', value: '1000', variableName: 'forestArea' },
          ],
        },
        {
          ...x07ForestAreaChange,
          values: [
            { colName: '2020-2025', value: '0', variableName: 'forest_expansion' },
            { colName: '2020-2025', value: '0', variableName: 'deforestation' },
          ],
        },
      ],
      { scope: 'test' },
    ],
  })

  test('NC edits forestArea in table 1a and sees validation error in forest area change navigation', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage
    const forestAreaChangeNavItem = NavigationUtils.getNavigationSubSectionItem(page, x07ForestAreaChangePath)

    await page.goto(x07ExtentOfForestPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.ensureEditingUnlocked(page)

    const cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '1500')
    await cellSaved

    await expect(forestAreaChangeNavItem.locator('.validation-error-indicator')).toBeVisible({ timeout: 20000 })

    await forestAreaChangeNavItem.click()
    await expect(page).toHaveURL(/\/sections\/forestAreaChange$/)
    await expect(TableDomUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await TableDomUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')
    await TableDomUtils.expectTableHasError(page, TableNames.forestAreaChange)

    await NavigationUtils.getNavigationSubSectionItem(page, x07ExtentOfForestPath).click()
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)

    const cellRestored = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '1000')
    await cellRestored

    await expect(forestAreaChangeNavItem.locator('.validation-error-indicator')).toHaveCount(0, { timeout: 20000 })
    await forestAreaChangeNavItem.click()
    await expect(page).toHaveURL(/\/sections\/forestAreaChange$/)
    await TableDomUtils.expectCellHasNoValidationError(page, 'forestAreaNetChange', '2020-2025')
    await TableDomUtils.expectTableHasNoError(page, TableNames.forestAreaChange)
  })
})

test.describe('Section tables: 1a - negative forestArea and otherWoodedLand', () => {
  test.use({ tableSeeds: [x06ExtentOfForest] })

  test('NC enters negative values in forestArea and otherWoodedLand and sees validation errors', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x06ExtentOfForestPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.ensureEditingUnlocked(page)

    let cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '-1')
    await cellSaved

    await TableDomUtils.expectCellHasValidationError(page, 'forestArea', '2025')
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_forestArea_colName_2025"]'),
      'Value should be greater than zero'
    )

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'otherWoodedLand', '2025', '-1')
    await cellSaved

    await TableDomUtils.expectCellHasValidationError(page, 'otherWoodedLand', '2025')
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_otherWoodedLand_colName_2025"]'),
      'Value should be greater than zero'
    )

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '1')
    await cellSaved

    await TableDomUtils.expectCellHasNoValidationError(page, 'forestArea', '2025')

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'otherWoodedLand', '2025', '1')
    await cellSaved

    await TableDomUtils.expectCellHasNoValidationError(page, 'otherWoodedLand', '2025')
  })
})

test.describe('Section tables: 1a - forestArea exceeds total land area', () => {
  test.use({ tableSeeds: [x06ExtentOfForest] })

  test('NC enters forestArea exceeding totalLandArea and sees otherLand validation error', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x06ExtentOfForestPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.ensureEditingUnlocked(page)

    let cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '5000')
    await cellSaved

    await TableDomUtils.expectCellHasValidationError(page, 'otherLand', '2025')
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_otherLand_colName_2025"]'),
      'Forest area and other wooded land exceed total land area'
    )
    await TableDomUtils.expectTableHasError(page, TableNames.extentOfForest)

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '1000')
    await cellSaved

    await TableDomUtils.expectCellHasNoValidationError(page, 'otherLand', '2025')
    await TableDomUtils.expectTableHasNoError(page, TableNames.extentOfForest)
  })
})

test.describe('Section tables: 1a - forestArea differs from FRA 2020 reported value', () => {
  const forestArea2020Value = '2000'

  test.use({
    tableSeeds: [
      [
        {
          ...albExtentOfForest2020,
          cleanup: false,
          values: [{ colName: '2020', value: forestArea2020Value, variableName: 'forestArea' }],
        },
        {
          ...albExtentOfForest,
          cleanup: false,
          values: [{ colName: '2020', value: forestArea2020Value, variableName: 'forestArea' }],
        },
      ],
      { scope: 'test' },
    ],
  })

  test('NC edits forestArea to mismatch FRA 2020 value and sees cross-cycle validation error', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(albSectionPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.ensureEditingUnlocked(page)

    await TableDomUtils.expectCellHasNoValidationError(page, 'forestArea', '2020')

    await TableDomUtils.fillCell(page, 'forestArea', '2020', '1800')
    await TableDomUtils.expectCellHasValidationError(page, 'forestArea', '2020')

    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_forestArea_colName_2020"]'),
      'differs from previously reported'
    )

    await TableDomUtils.fillCell(page, 'forestArea', '2020', forestArea2020Value)
    await TableDomUtils.expectCellHasNoValidationError(page, 'forestArea', '2020')
  })
})
