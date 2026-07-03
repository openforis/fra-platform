import { TableNames } from 'meta/assessment/table'

import { expect, test } from '../fixtures/auth'
import { CountryStatusUtils } from '../utils/countryStatus'
import { DOMUtils } from '../utils/dom'
import { NavigationUtils } from '../utils/navigation'
import { TooltipUtils } from '../utils/tooltip'
import { x01ForestAreaChangePath, x16ExtentOfForestPath, x16ForestAreaChangePath } from './08-section-tables.fixture'

const forestExtentSectionHeader = 'Forest extent, characteristics and changes'

test.describe.serial('Section tables: 1d - negative forest_expansion and deforestation', () => {
  test('NC enters negative values in forest_expansion and deforestation and sees validation errors', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x01ForestAreaChangePath)
    await expect(DOMUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)

    let cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'forest_expansion', '2020-2025', '-1')
    await cellSaved

    await DOMUtils.expectCellHasValidationError(page, 'forest_expansion', '2020-2025')
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_forest_expansion_colName_2020-2025"]'),
      'Value should be greater than zero'
    )

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'deforestation', '2020-2025', '-1')
    await cellSaved

    await DOMUtils.expectCellHasValidationError(page, 'deforestation', '2020-2025')
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_deforestation_colName_2020-2025"]'),
      'Value should be greater than zero'
    )

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'forest_expansion', '2020-2025', '1')
    await cellSaved

    await DOMUtils.expectCellHasNoValidationError(page, 'forest_expansion', '2020-2025')

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'deforestation', '2020-2025', '1')
    await cellSaved

    await DOMUtils.expectCellHasNoValidationError(page, 'deforestation', '2020-2025')

    await DOMUtils.clearTable(page, TableNames.forestAreaChange)
  })
})

test.describe.serial('Section tables: 1d - afforestation exceeds forest_expansion', () => {
  test('NC enters afforestation exceeding forest_expansion and sees subcategory validation error', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x01ForestAreaChangePath)
    await expect(DOMUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)

    let cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'forest_expansion', '2020-2025', '100')
    await cellSaved

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'afforestation', '2020-2025', '200')
    await cellSaved

    await DOMUtils.expectCellHasValidationError(page, 'afforestation', '2020-2025')
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_afforestation_colName_2020-2025"]'),
      'Subcategory exceeds parent'
    )

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'afforestation', '2020-2025', '50')
    await cellSaved

    await DOMUtils.expectCellHasNoValidationError(page, 'afforestation', '2020-2025')

    await DOMUtils.clearTable(page, TableNames.forestAreaChange)
  })
})

test.describe.serial('Section tables: 1d - afforestation and natural_expansion do not sum to forest_expansion', () => {
  test('NC enters sub-categories that do not sum to forest_expansion and sees validation error', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x01ForestAreaChangePath)
    await expect(DOMUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)

    let cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'forest_expansion', '2020-2025', '100')
    await cellSaved

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'afforestation', '2020-2025', '30')
    await cellSaved

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'natural_expansion', '2020-2025', '40')
    await cellSaved

    await DOMUtils.expectCellHasValidationError(page, 'afforestation', '2020-2025')
    await DOMUtils.expectCellHasValidationError(page, 'natural_expansion', '2020-2025')
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_afforestation_colName_2020-2025"]'),
      'is not equal to'
    )

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'natural_expansion', '2020-2025', '70')
    await cellSaved

    await DOMUtils.expectCellHasNoValidationError(page, 'afforestation', '2020-2025')
    await DOMUtils.expectCellHasNoValidationError(page, 'natural_expansion', '2020-2025')

    await DOMUtils.clearTable(page, TableNames.forestAreaChange)
  })
})

test.describe.serial('Section tables: 1d - validation errors persist on page reload', () => {
  test('NC creates a forestAreaNetChange error, leaves the page, comes back, and sees the error without any interaction', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x16ExtentOfForestPath)
    await expect(DOMUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)

    const cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await DOMUtils.fillCell(page, 'forestArea', '2025', '1500')
    await cellSaved

    await NavigationUtils.getNavigationSubSectionItem(page, x16ForestAreaChangePath).click()
    await expect(DOMUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await DOMUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')

    await page.goto(x16ForestAreaChangePath)
    await expect(DOMUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })

    await DOMUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')
    await DOMUtils.expectTableHasError(page, TableNames.forestAreaChange)
    await NavigationUtils.expectNavigationError(page, {
      hasError: true,
      sectionHeader: forestExtentSectionHeader,
      sectionItemPath: x16ForestAreaChangePath,
    })
    await CountryStatusUtils.expectSubmitToReviewWarning(page)

    await page.goto(x16ExtentOfForestPath)
    await expect(DOMUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.unlockEditing(page)
    await DOMUtils.clearTable(page, TableNames.extentOfForest)
  })
})
