import { type Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Numbers } from 'utils/numbers'

import { type TableSeedValue } from 'test/e2e/api/table'
import { x13ForestAreaChange, x13ForestAreaChangePath } from 'test/e2e/data/sectionTables'
import { expect, test } from 'test/e2e/fixtures/table'
import { DOMUtils } from 'test/e2e/utils/dom'
import { TableDomUtils } from 'test/e2e/utils/table'

type TableValues = Record<string, Array<string>>

// The editable rows and columns of 1d, in the order the table shows them
const variableNames = ['forest_expansion', 'afforestation', 'natural_expansion', 'deforestation']
const colNames = ['1990-2000', '2000-2010', '2010-2015', '2015-2020', '2020-2025']

// In every column afforestation and natural_expansion add up to forest_expansion, so the subcategory checks pass
const seededValues: TableValues = {
  forest_expansion: ['300', '300', '300', '300', '300'],
  afforestation: ['100', '100', '100', '100', '100'],
  natural_expansion: ['200', '200', '200', '200', '200'],
  deforestation: ['50', '50', '50', '50', '50'],
}

const _toSeedValues = (values: TableValues): Array<TableSeedValue> =>
  variableNames.flatMap<TableSeedValue>((variableName) =>
    colNames.map<TableSeedValue>((colName, index) => ({ colName, value: values[variableName][index], variableName }))
  )

// Waits for the table data, so a late response can't overwrite a paste and a reload shows what the server kept
const _loadTable = async (page: Page, load: () => Promise<unknown>): Promise<void> => {
  const tableLoaded = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Table.tableData(), 'GET')
  await load()
  await tableLoaded
}

const _expectValues = async (page: Page, values: TableValues): Promise<void> => {
  await Promise.all(
    variableNames.flatMap<Promise<void>>((variableName) =>
      colNames.map<Promise<void>>((colName, index) =>
        // An empty cell shows as '', and Numbers.toFixed gives null for it
        TableDomUtils.expectCellValue(page, variableName, colName, Numbers.toFixed(values[variableName][index]) ?? '')
      )
    )
  )
}

test.describe('Section tables: 1d - paste', () => {
  test.use({ tableSeeds: [{ ...x13ForestAreaChange, values: _toSeedValues(seededValues) }] })

  test('NC pastes a block of cells and sees only those cells change, also after reloading the page', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await _loadTable(page, () => page.goto(x13ForestAreaChangePath))
    await DOMUtils.ensureEditingUnlocked(page)
    await _expectValues(page, seededValues)

    const pasteSaved = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Table.nodes(), 'PATCH')
    await TableDomUtils.pasteCells(page, 'afforestation', '2000-2010', [
      ['110', '120'],
      ['190', '180'],
    ])
    expect((await pasteSaved).ok()).toBeTruthy()

    const expectedValues: TableValues = {
      forest_expansion: ['300', '300', '300', '300', '300'],
      afforestation: ['100', '110', '120', '100', '100'],
      natural_expansion: ['200', '190', '180', '200', '200'],
      deforestation: ['50', '50', '50', '50', '50'],
    }
    await _expectValues(page, expectedValues)

    await _loadTable(page, () => page.reload())
    await _expectValues(page, expectedValues)
  })

  test('NC pastes a whole table and sees every cell filled, also after reloading the page', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await _loadTable(page, () => page.goto(x13ForestAreaChangePath))
    await DOMUtils.ensureEditingUnlocked(page)

    const pastedValues: TableValues = {
      forest_expansion: ['30', '40', '50', '60', '70'],
      afforestation: ['10', '15', '20', '25', '30'],
      natural_expansion: ['20', '25', '30', '35', '40'],
      deforestation: ['5', '6', '7', '8', '9'],
    }
    const pasteSaved = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Table.nodes(), 'PATCH')
    const rows = variableNames.map<Array<string>>((variableName) => pastedValues[variableName])
    await TableDomUtils.pasteCells(page, 'forest_expansion', '1990-2000', rows)
    expect((await pasteSaved).ok()).toBeTruthy()

    await _expectValues(page, pastedValues)

    await _loadTable(page, () => page.reload())
    await _expectValues(page, pastedValues)
  })

  test('NC pastes empty cells over filled ones and sees them cleared, also after reloading the page', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await _loadTable(page, () => page.goto(x13ForestAreaChangePath))
    await DOMUtils.ensureEditingUnlocked(page)
    await _expectValues(page, seededValues)

    const pasteSaved = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Table.nodes(), 'PATCH')
    await TableDomUtils.pasteCells(page, 'afforestation', '2010-2015', [
      ['', ''],
      ['', ''],
    ])
    expect((await pasteSaved).ok()).toBeTruthy()

    const expectedValues: TableValues = {
      forest_expansion: ['300', '300', '300', '300', '300'],
      afforestation: ['100', '100', '', '', '100'],
      natural_expansion: ['200', '200', '', '', '200'],
      deforestation: ['50', '50', '50', '50', '50'],
    }
    await _expectValues(page, expectedValues)

    await _loadTable(page, () => page.reload())
    await _expectValues(page, expectedValues)
  })
})
