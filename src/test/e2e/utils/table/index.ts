import { expect, Locator, Page } from '@playwright/test'

import { DOMUtils } from '../dom'
import { NdpPathProps, SectionUtils } from '../section'

const cellLocator = (page: Page, variableName: string, colName: string): Locator =>
  page.locator(`[id$="variableName_${variableName}_colName_${colName}"]`)

const getCellValue = async (page: Page, variableName: string, colName: string): Promise<string> => {
  const cell = cellLocator(page, variableName, colName)
  const input = cell.locator('input')
  if (await input.count()) return input.inputValue()
  const text = await cell.innerText()
  return text.replace(/\s/g, '')
}

const expectCellValue = async (page: Page, variableName: string, colName: string, value: string): Promise<void> => {
  await expect(async () => {
    expect(await getCellValue(page, variableName, colName)).toBe(value)
  }).toPass({ timeout: 10000 })
}

// A NDP column only exists while there is NDP for that year
const expectCellMissing = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName)).toHaveCount(0, { timeout: 10000 })
}

const expectCellReadOnly = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName).locator('.input-text.disabled')).toBeVisible({
    timeout: 10000,
  })
}

const expectCellEditable = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName).locator('input')).toBeEnabled({ timeout: 10000 })
}

const expectCellHasValidationError = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName)).toHaveClass(/validation-error/, { timeout: 10000 })
}

const expectCellHasNoValidationError = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName)).not.toHaveClass(/validation-error/, { timeout: 10000 })
}

const fillCell = async (page: Page, variableName: string, colName: string, value: string): Promise<void> => {
  const cellInput = cellLocator(page, variableName, colName).locator('input')
  await cellInput.click()
  await cellInput.fill(value)
  await cellInput.blur()
}

const tableContainer = (page: Page, tableName: string): Locator =>
  page.locator(`[id$="tableName_${tableName}"]`).locator('xpath=..')

const tableValidationErrors = (page: Page, tableName: string): Locator =>
  tableContainer(page, tableName).locator('.data-validations')

const clearTable = async (page: Page, tableName: string): Promise<void> => {
  page.once('dialog', (dialog): Promise<void> => dialog.accept())
  const cleared = DOMUtils.waitForResponse(page, '/api/cycle-data/table/clear', 'POST')
  await tableContainer(page, tableName).getByRole('button', { name: 'Clear table' }).click()
  await cleared
}

const expectTableHasError = async (page: Page, tableName: string): Promise<void> => {
  await expect(tableValidationErrors(page, tableName)).toBeVisible({ timeout: 10000 })
}

const expectTableHasNoError = async (page: Page, tableName: string): Promise<void> => {
  await expect(tableValidationErrors(page, tableName)).toHaveCount(0)
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
  expectTableHasError,
  expectTableHasNoError,
  fillCell,
  getCellValue,
  tableContainer,
  tableValidationErrors,
}
