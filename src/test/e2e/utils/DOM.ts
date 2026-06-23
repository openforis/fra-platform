import { expect, Locator, Page } from '@playwright/test'

import { Promises } from 'utils/promises'

// Eg. { id: 'telephone-field' }
type Selector = Record<string, string>

const toSelector = (selector: Selector): string => {
  const [key, value] = Object.entries(selector)[0]
  return `[${key}="${value}"]`
}

const fillInput = async (page: Page, selector: Selector, value: string): Promise<void> => {
  await page.fill(toSelector(selector), value)
}

const fillWYSIWYG = async (page: Page, selector: Selector, value: string): Promise<void> => {
  await page.locator(`${toSelector(selector)} [contenteditable="true"]`).fill(value)
}

const fillEditorWysiwyg = async (page: Page, editor: Locator, lines: Array<string>): Promise<void> => {
  await editor.click()
  await editor.selectText()
  await page.keyboard.press('Backspace')

  await Promises.each(lines, async (line, index) => {
    if (index > 0) await page.keyboard.press('Enter')
    await page.keyboard.type(line)
  })

  await page.waitForTimeout(300)
  await editor.blur()
}

const pasteIntoEditorWysiwyg = async (page: Page, editor: Locator, html: string): Promise<void> => {
  await editor.click()
  await editor.selectText()
  await page.keyboard.press('Backspace')

  await editor.evaluate((el, pastedHtml) => {
    const dataTransfer = new DataTransfer()
    dataTransfer.setData('text/html', pastedHtml)
    el.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: dataTransfer }))
  }, html)

  // Jodit pop up
  const keepHtmlButton = page.locator('.jodit-dialog button[data-ref="keep"]')
  await keepHtmlButton.waitFor({ state: 'visible', timeout: 2000 }).catch((): void => undefined)
  if (await keepHtmlButton.isVisible()) await keepHtmlButton.click()

  await page.waitForTimeout(300)
  await editor.blur()
}

const descriptionBlock = (page: Page, title: string): Locator =>
  page
    .locator('.description-title', { hasText: title })
    .first()
    .locator('xpath=ancestor::*[contains(@class, "data-grid") and contains(@class, "description")][1]')

const descriptionEditor = (page: Page, title: string): Locator =>
  descriptionBlock(page, title).locator('.jodit-wysiwyg')

const descriptionValidationError = (page: Page, title: string): Locator =>
  descriptionBlock(page, title).locator('.validation-error')

const descriptionToggleEditButton = (page: Page, title: string, name: 'Done' | 'Edit'): Locator =>
  descriptionBlock(page, title).locator('button:visible', { hasText: name })

const expectValidationTooltip = async (page: Page, locator: Locator, text: string): Promise<void> => {
  await locator.hover()
  await expect(page.getByRole('tooltip').filter({ hasText: text })).toBeVisible({ timeout: 20000 })
}

const waitForApiSave = (page: Page, pathSubstring: string, method = 'PUT'): Promise<unknown> =>
  page.waitForResponse((response) => response.url().includes(pathSubstring) && response.request().method() === method)

const nestedSelectOption = async (page: Page, selector: Selector, optionName: string, exact = true): Promise<void> => {
  await page.locator(toSelector(selector)).click()
  await page.keyboard.type(optionName)
  await page.getByRole('option', { name: optionName, exact }).click()
}

const selectOption = async (page: Page, selector: Selector, optionName: string, exact = true): Promise<void> => {
  await page.locator(toSelector(selector)).click()
  await page.getByRole('option', { name: optionName, exact }).click()
}

const elementNotExists = async (locator: Locator): Promise<void> => {
  await expect(locator).toHaveCount(0)
}

// Internal utility to find datatable cell
const cellLocator = (page: Page, variableName: string, colName: string): Locator =>
  page.locator(`[id$="variableName_${variableName}_colName_${colName}"]`)

// Return cell value from input or inner text
const getCellValue = async (page: Page, variableName: string, colName: string): Promise<string> => {
  const cell = cellLocator(page, variableName, colName)
  const input = cell.locator('input')
  if (await input.count()) return input.inputValue()
  const text = await cell.innerText()
  return text.replace(/\s/g, '')
}

// Expect cell value to have given value
const expectCellValue = async (page: Page, variableName: string, colName: string, value: string): Promise<void> => {
  await expect(async () => {
    expect(await getCellValue(page, variableName, colName)).toBe(value)
  }).toPass({ timeout: 10000 })
}

const expectCellHasValidationError = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName)).toHaveClass(/validation-error/, { timeout: 10000 })
}

const expectCellHasNoValidationError = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName)).not.toHaveClass(/validation-error/, { timeout: 10000 })
}

// Fill table cell for given variable and colname with value
const fillCell = async (page: Page, variableName: string, colName: string, value: string): Promise<void> => {
  const cellInput = cellLocator(page, variableName, colName).locator('input')
  await cellInput.click()
  await cellInput.press('Control+A') // If the cell already has a value, we need to delete it first.
  await cellInput.press('Backspace')
  await cellInput.pressSequentially(value)
  await cellInput.blur()
}

// Table parent container
const tableContainer = (page: Page, tableName: string): Locator =>
  page.locator(`[id$="tableName_${tableName}"]`).locator('xpath=..')

// Validation message underneath the table
const tableValidationErrors = (page: Page, tableName: string): Locator =>
  tableContainer(page, tableName).locator('.data-validations')

const clearTable = async (page: Page, tableName: string): Promise<void> => {
  page.once('dialog', (dialog): Promise<void> => dialog.accept())
  await tableContainer(page, tableName).getByRole('button', { name: 'Clear table' }).click()
}

const expectTableHasError = async (page: Page, tableName: string): Promise<void> => {
  await expect(tableValidationErrors(page, tableName)).toBeVisible({ timeout: 10000 })
}

const expectTableHasNoError = async (page: Page, tableName: string): Promise<void> => {
  await expect(tableValidationErrors(page, tableName)).toHaveCount(0)
}

const unlockEditing = async (page: Page): Promise<void> => {
  await page.locator('.btn-lock.locked').click()
}

// Navigate the platform using the left navigation
const sidebarNavigate = async (page: Page, section: string, subSection: string): Promise<void> => {
  await page.locator('.nav-section__header', { hasText: section }).click()
  await page.locator('.nav-section__item', { hasText: subSection }).click()
}

export const DOMUtils = {
  clearTable,
  descriptionBlock,
  descriptionEditor,
  descriptionToggleEditButton,
  descriptionValidationError,
  elementNotExists,
  expectCellHasNoValidationError,
  expectCellHasValidationError,
  expectCellValue,
  expectTableHasError,
  expectTableHasNoError,
  expectValidationTooltip,
  fillCell,
  fillEditorWysiwyg,
  fillInput,
  fillWYSIWYG,
  getCellValue,
  nestedSelectOption,
  pasteIntoEditorWysiwyg,
  selectOption,
  sidebarNavigate,
  tableContainer,
  tableValidationErrors,
  unlockEditing,
  waitForApiSave,
}
