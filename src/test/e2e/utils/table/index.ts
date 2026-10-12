import { expect, Locator, Page } from '@playwright/test'

import { Numbers } from 'utils/numbers'

import { Timeouts } from 'test/e2e/config/timeouts'

import { DOMUtils } from '../dom'
import { NdpPathProps, SectionUtils } from '../section'

const tableContainer = (page: Page, tableName: string): Locator =>
  page.locator(`[id$="tableName_${tableName}"]`).locator('xpath=..')

const cellLocator = (page: Page, variableName: string, colName: string, tableName?: string): Locator => {
  const selector = `[id$="variableName_${variableName}_colName_${colName}"]`
  return tableName ? tableContainer(page, tableName).locator(selector) : page.locator(selector)
}

const getCellValue = async (page: Page, variableName: string, colName: string, tableName?: string): Promise<string> => {
  const cell = cellLocator(page, variableName, colName, tableName)
  const input = cell.locator('input')
  if (await input.count()) return input.inputValue()
  const text = await cell.innerText()
  return text.replace(/\s/g, '')
}

const expectCellValue = async (
  page: Page,
  variableName: string,
  colName: string,
  value: string,
  tableName?: string
): Promise<void> => {
  await expect(async () => {
    expect(await getCellValue(page, variableName, colName, tableName)).toBe(value)
  }).toPass({ timeout: Timeouts.medium })
}

// A NDP column only exists while there is NDP for that year
const expectCellMissing = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName)).toHaveCount(0, { timeout: Timeouts.medium })
}

const expectCellReadOnly = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName).locator('.input-text.disabled')).toBeVisible({
    timeout: Timeouts.medium,
  })
}

const expectCellEditable = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName).locator('input')).toBeEnabled({ timeout: Timeouts.medium })
}

const expectCellHasValidationError = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName)).toHaveClass(/validation-error/, { timeout: Timeouts.medium })
}

const expectCellHasNoValidationError = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName)).not.toHaveClass(/validation-error/, {
    timeout: Timeouts.medium,
  })
}

const fillCell = async (page: Page, variableName: string, colName: string, value: string): Promise<void> => {
  const cellInput = cellLocator(page, variableName, colName).locator('input')
  await cellInput.click()
  await cellInput.fill(value)
  await cellInput.blur()
}

const tableValidationErrors = (page: Page, tableName: string): Locator =>
  tableContainer(page, tableName).locator('.data-validations')

const clearTable = async (page: Page, tableName: string): Promise<void> => {
  page.once('dialog', (dialog): Promise<void> => dialog.accept())
  const cleared = DOMUtils.waitForResponse(page, '/api/cycle-data/table/clear', 'POST')
  await tableContainer(page, tableName).getByRole('button', { name: 'Clear table' }).click()
  await cleared
}

const expectTableHasError = async (page: Page, tableName: string): Promise<void> => {
  await expect(tableValidationErrors(page, tableName)).toBeVisible({ timeout: Timeouts.medium })
}

const expectTableHasNoError = async (page: Page, tableName: string): Promise<void> => {
  await expect(tableValidationErrors(page, tableName)).toHaveCount(0)
}

type ExpectSeededValuesMatchProps = {
  page: Page
  colNames: Array<string>
  variableNames: Array<string>
  getSeededDatum: (props: { colName: string; variableName: string }) => string | undefined
  tableName?: string
}

const expectSeededValuesMatch = async (props: ExpectSeededValuesMatchProps): Promise<void> => {
  const { colNames, getSeededDatum, page, tableName, variableNames } = props

  await Promise.all(
    colNames.flatMap((colName) =>
      variableNames.map((variableName) => {
        const expectedRaw = getSeededDatum({ colName, variableName })
        // A blank cell shows as '' in the DOM, not null - match that instead of Numbers.toFixed's null
        const expectedValue = Numbers.toFixed(expectedRaw) ?? ''
        return expectCellValue(page, variableName, colName, expectedValue, tableName)
      })
    )
  )
}

const clickOdpLink = async (page: Page, props: NdpPathProps): Promise<void> => {
  const path = SectionUtils.ndpPath(props)

  await page.locator('.table-grid__odp-link', { hasText: String(props.year) }).click()
  await page.waitForURL(path)
  await page.locator('.odp__tab-controller .odp__tab-item.active').waitFor()
}

export const TableDomUtils = {
  clearTable,
  clickOdpLink,
  expectCellHasNoValidationError,
  expectCellHasValidationError,
  expectCellEditable,
  expectCellMissing,
  expectCellReadOnly,
  expectCellValue,
  expectSeededValuesMatch,
  expectTableHasError,
  expectTableHasNoError,
  fillCell,
  getCellValue,
  tableContainer,
  tableValidationErrors,
}
