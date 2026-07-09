import { TableNames } from 'meta/assessment/table'

import { expect, test } from '../fixtures/auth'
import { DOMUtils } from '../utils/dom'
import { NavigationUtils } from '../utils/navigation'
import { TableDomUtils } from '../utils/table'
import { TooltipUtils } from '../utils/tooltip'
import {
  albSection2020Path,
  albSectionPath,
  x06ExtentOfForestPath,
  x07ExtentOfForestPath,
  x07ForestAreaChangePath,
} from './08-section-tables.fixture'

test.describe.serial('Section tables: 1a - edit and clear table', () => {
  test('NC edits table 1a', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x06ExtentOfForestPath)
    await DOMUtils.unlockEditing(page)

    const cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '1990', '1000')
    await cellSaved

    await TableDomUtils.clearTable(page, TableNames.extentOfForest)
    await TableDomUtils.expectCellValue(page, 'forestArea', '1990', '')
  })
})

test.describe.serial('Section tables: 1a - forestArea change triggers net change error in 1d', () => {
  test('NC edits forestArea in table 1a and sees validation error in forest area change navigation', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage
    const forestAreaChangeNavItem = NavigationUtils.getNavigationSubSectionItem(page, x07ForestAreaChangePath)

    await page.goto(x07ExtentOfForestPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)

    let cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2020', '1000')
    await cellSaved

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '1000')
    await cellSaved

    await forestAreaChangeNavItem.click()
    await expect(page).toHaveURL(/\/sections\/forestAreaChange$/)
    await expect(TableDomUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forest_expansion', '2020-2025', '0')
    await cellSaved

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'deforestation', '2020-2025', '0')
    await cellSaved

    await NavigationUtils.getNavigationSubSectionItem(page, x07ExtentOfForestPath).click()
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
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

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '1000')
    await cellSaved

    await expect(forestAreaChangeNavItem.locator('.validation-error-indicator')).toHaveCount(0, { timeout: 20000 })
    await forestAreaChangeNavItem.click()
    await expect(page).toHaveURL(/\/sections\/forestAreaChange$/)
    await TableDomUtils.expectCellHasNoValidationError(page, 'forestAreaNetChange', '2020-2025')
    await TableDomUtils.expectTableHasNoError(page, TableNames.forestAreaChange)
  })
})

test.describe.serial('Section tables: 1a - negative forestArea and otherWoodedLand', () => {
  test('NC enters negative values in forestArea and otherWoodedLand and sees validation errors', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x06ExtentOfForestPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)

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

    await TableDomUtils.clearTable(page, TableNames.extentOfForest)
  })
})

test.describe.serial('Section tables: 1a - forestArea exceeds total land area', () => {
  test('NC enters forestArea exceeding totalLandArea and sees otherLand validation error', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x06ExtentOfForestPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)

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

    await TableDomUtils.clearTable(page, TableNames.extentOfForest)
  })
})

test.describe.serial('Section tables: 1a - forestArea differs from FRA 2020 reported value', () => {
  const forestArea2020Value = '2000'

  test('NC edits forestArea to mismatch FRA 2020 value and sees cross-cycle validation error', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(albSection2020Path)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)

    let cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2020', forestArea2020Value)
    await cellSaved

    await page.goto(albSectionPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2020', forestArea2020Value)
    await cellSaved

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
