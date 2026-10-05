import { TableNames } from 'meta/assessment/table'

import {
  x05ForestAreaChange,
  x05ForestAreaChangePath,
  x16ExtentOfForest,
  x16ExtentOfForestPath,
  x16ForestAreaChange,
  x16ForestAreaChangePath,
} from 'test/e2e/data/sectionTables'
import { expect, test } from 'test/e2e/fixtures/table'
import { CountryStatusUtils } from 'test/e2e/utils/countryStatus'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { TableDomUtils } from 'test/e2e/utils/table'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const forestExtentSectionHeader = 'Forest extent, characteristics and changes'

test.describe('Section tables: 1d - negative forest_expansion and deforestation', () => {
  test.use({ tableSeeds: [x05ForestAreaChange] })

  test('NC enters negative values in forest_expansion and deforestation and sees validation errors', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x05ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await DOMUtils.ensureEditingUnlocked(page)

    let cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forest_expansion', '2020-2025', '-1')
    await cellSaved

    await TableDomUtils.expectCellHasValidationError(page, 'forest_expansion', '2020-2025')
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_forest_expansion_colName_2020-2025"]'),
      'Value should be greater than zero'
    )

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'deforestation', '2020-2025', '-1')
    await cellSaved

    await TableDomUtils.expectCellHasValidationError(page, 'deforestation', '2020-2025')
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_deforestation_colName_2020-2025"]'),
      'Value should be greater than zero'
    )

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forest_expansion', '2020-2025', '1')
    await cellSaved

    await TableDomUtils.expectCellHasNoValidationError(page, 'forest_expansion', '2020-2025')

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'deforestation', '2020-2025', '1')
    await cellSaved

    await TableDomUtils.expectCellHasNoValidationError(page, 'deforestation', '2020-2025')
  })
})

test.describe('Section tables: 1d - afforestation exceeds forest_expansion', () => {
  test.use({
    tableSeeds: [
      { ...x05ForestAreaChange, values: [{ colName: '2020-2025', value: '100', variableName: 'forest_expansion' }] },
    ],
  })

  test('NC enters afforestation exceeding forest_expansion and sees subcategory validation error', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x05ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await DOMUtils.ensureEditingUnlocked(page)

    let cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'afforestation', '2020-2025', '200')
    await cellSaved

    await TableDomUtils.expectCellHasValidationError(page, 'afforestation', '2020-2025')
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_afforestation_colName_2020-2025"]'),
      'Subcategory exceeds parent'
    )

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'afforestation', '2020-2025', '50')
    await cellSaved

    await TableDomUtils.expectCellHasNoValidationError(page, 'afforestation', '2020-2025')
  })
})

test.describe('Section tables: 1d - afforestation and natural_expansion do not sum to forest_expansion', () => {
  test.use({
    tableSeeds: [
      { ...x05ForestAreaChange, values: [{ colName: '2020-2025', value: '100', variableName: 'forest_expansion' }] },
    ],
  })

  test('NC enters sub-categories that do not sum to forest_expansion and sees validation error', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x05ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await DOMUtils.ensureEditingUnlocked(page)

    let cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'afforestation', '2020-2025', '30')
    await cellSaved

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'natural_expansion', '2020-2025', '40')
    await cellSaved

    await TableDomUtils.expectCellHasValidationError(page, 'afforestation', '2020-2025')
    await TableDomUtils.expectCellHasValidationError(page, 'natural_expansion', '2020-2025')
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('[id$="variableName_afforestation_colName_2020-2025"]'),
      'is not equal to'
    )

    cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'natural_expansion', '2020-2025', '70')
    await cellSaved

    await TableDomUtils.expectCellHasNoValidationError(page, 'afforestation', '2020-2025')
    await TableDomUtils.expectCellHasNoValidationError(page, 'natural_expansion', '2020-2025')
  })
})

test.describe('Section tables: 1d - validation errors persist on page reload', () => {
  test.use({
    tableSeeds: [
      [
        { ...x16ExtentOfForest, values: [{ colName: '2020', value: '1000', variableName: 'forestArea' }] },
        {
          ...x16ForestAreaChange,
          values: [
            { colName: '2020-2025', value: '0', variableName: 'forest_expansion' },
            { colName: '2020-2025', value: '0', variableName: 'deforestation' },
          ],
        },
      ],
      { scope: 'test' },
    ],
  })

  test('NC creates a forestAreaNetChange error, leaves the page, comes back, and sees the error without any interaction', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage
    const forestAreaChangeNavItem = NavigationUtils.getNavigationSubSectionItem(page, x16ForestAreaChangePath)

    await page.goto(x16ExtentOfForestPath)
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })
    await DOMUtils.ensureEditingUnlocked(page)

    const cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '1500')
    await cellSaved

    await forestAreaChangeNavItem.click()
    await expect(TableDomUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })
    await TableDomUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')

    await page.goto(x16ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({ timeout: 20000 })

    await TableDomUtils.expectCellHasValidationError(page, 'forestAreaNetChange', '2020-2025')
    await TableDomUtils.expectTableHasError(page, TableNames.forestAreaChange)
    await NavigationUtils.expectNavigationError(page, {
      hasError: true,
      sectionHeader: forestExtentSectionHeader,
      sectionItemPath: x16ForestAreaChangePath,
    })
    await CountryStatusUtils.expectSubmitToReviewWarning(page)
  })
})
