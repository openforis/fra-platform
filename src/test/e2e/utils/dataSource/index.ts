import { expect, Locator, Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'

import { DOMUtils } from '../dom'

const getDataSourceTable = (page: Page): Locator => page.locator('.data-grid.data-source')

const getDataSourceReferenceCells = (page: Page): Locator =>
  getDataSourceTable(page).locator('.datasource-column-reference')

const addDataSource = async (page: Page): Promise<Locator> => {
  const editors = getDataSourceReferenceCells(page).locator('.jodit-wysiwyg')
  const editorCount = await editors.count()

  const addButton = page
    .locator('.data-grid.description', { has: getDataSourceTable(page) })
    .getByRole('button', { name: 'Add', exact: true })
  await addButton.click()
  await expect(editors).toHaveCount(editorCount + 1)

  return editors.nth(editorCount)
}

// get data source by text
const getDataSourceReferenceCell = (page: Page, text: string): Locator =>
  getDataSourceReferenceCells(page).filter({ hasText: text })

const getDataSourceReferenceEditor = (page: Page, text: string): Locator =>
  getDataSourceReferenceCell(page, text).locator('.jodit-wysiwyg')

const getDataSourceReferenceValidationError = (page: Page, text: string): Locator =>
  getDataSourceTable(page).locator('.editorWYSIWYG.validation-error', { hasText: text })

const getDataSourceRowClass = async (page: Page, text: string): Promise<string> => {
  const className = await getDataSourceReferenceCell(page, text).getAttribute('class')
  const rowClass = className?.match(/datasource-row-\S+/)?.[0]
  if (!rowClass) throw new Error(`Could not determine data source row class from "${className}"`)
  return rowClass
}

const getDataSourceFieldCell = async (page: Page, text: string, field: string): Promise<Locator> => {
  const rowClass = await getDataSourceRowClass(page, text)
  return getDataSourceTable(page).locator(`.${rowClass}.datasource-column-${field}`)
}

const getDataSourceRowUuid = async (page: Page, text: string): Promise<string> => {
  const rowClass = await getDataSourceRowClass(page, text)
  return rowClass.replace('datasource-row-', '')
}

const getDataSourceRowReferenceCell = (page: Page, text: string): Promise<Locator> =>
  getDataSourceFieldCell(page, text, 'reference')

const getDataSourceTypeCell = (page: Page, text: string): Promise<Locator> => getDataSourceFieldCell(page, text, 'type')
const getDataSourceVariablesCell = (page: Page, text: string): Promise<Locator> =>
  getDataSourceFieldCell(page, text, 'variables')
const getDataSourceYearCell = (page: Page, text: string): Promise<Locator> => getDataSourceFieldCell(page, text, 'year')
const getDataSourceCommentsCell = (page: Page, text: string): Promise<Locator> =>
  getDataSourceFieldCell(page, text, 'comments')

type DataSourceSelectField = 'type' | 'variables' | 'year'

// Editing must be on, the selects are disabled otherwise
const selectDataSourceOption = async (
  page: Page,
  text: string,
  field: DataSourceSelectField,
  optionName: string
): Promise<void> => {
  const cell = await getDataSourceFieldCell(page, text, field)
  await cell.locator('.select__wrapper').click()
  await page.keyboard.type(optionName)
  await page.getByRole('option', { name: optionName, exact: true }).click()
  await page.keyboard.press('Escape')
}

// Removes the last picked option, editing must be on
const clearDataSourceOption = async (page: Page, text: string, field: DataSourceSelectField): Promise<void> => {
  const cell = await getDataSourceFieldCell(page, text, field)
  await cell.locator('.select__wrapper').click()
  await page.keyboard.press('Backspace')
  await page.keyboard.press('Escape')
}

const findDataSourceRowIndex = async (page: Page, text: string): Promise<number> => {
  await getDataSourceReferenceCell(page, text).waitFor()
  const texts = await getDataSourceReferenceCells(page).allInnerTexts()
  return texts.findIndex((cellText) => cellText.includes(text))
}

// the delete button has no accessible name, only an icon - identify it by icon class
const getDataSourceDeleteButtons = (page: Page): Locator =>
  getDataSourceTable(page).locator('button:has(svg.icon_trash-simple)')

// delete is only available when data source editing is unlocked
const deleteDataSourceRow = async (page: Page, text: string): Promise<void> => {
  const rowIndex = await findDataSourceRowIndex(page, text)

  const deleted = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Descriptions.DataSources.one(), 'DELETE')
  page.once('dialog', (dialog) => dialog.accept())
  await getDataSourceDeleteButtons(page).nth(rowIndex).click()
  await deleted
}

export const DataSourceUtils = {
  addDataSource,
  clearDataSourceOption,
  deleteDataSourceRow,
  getDataSourceCommentsCell,
  getDataSourceReferenceEditor,
  getDataSourceReferenceValidationError,
  getDataSourceRowReferenceCell,
  getDataSourceRowUuid,
  getDataSourceTable,
  getDataSourceTypeCell,
  getDataSourceVariablesCell,
  getDataSourceYearCell,
  selectDataSourceOption,
}
