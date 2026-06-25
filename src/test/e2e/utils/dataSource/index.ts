import { Locator, Page } from '@playwright/test'

const getDataSourceTable = (page: Page): Locator => page.locator('.data-grid.data-source')

const getDataSourceReferenceCells = (page: Page): Locator =>
  getDataSourceTable(page).locator('.editorWYSIWYG.editor-wysiwyg-links')

// Subject to change: last data source row is a placeholder to add new entries. Will be replaced with a button in #6085
const getDataSourcePlaceholderReferenceEditor = (page: Page): Locator =>
  getDataSourceReferenceCells(page).last().locator('.jodit-wysiwyg')

// get data source by text
const getDataSourceReferenceCell = (page: Page, text: string): Locator =>
  getDataSourceReferenceCells(page).filter({ hasText: text })

const getDataSourceReferenceEditor = (page: Page, text: string): Locator =>
  getDataSourceReferenceCell(page, text).locator('.jodit-wysiwyg')

const getDataSourceReferenceValidationError = (page: Page, text: string): Locator =>
  getDataSourceTable(page).locator('.editorWYSIWYG.validation-error', { hasText: text })

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
  page.once('dialog', (dialog) => dialog.accept())
  await getDataSourceDeleteButtons(page).nth(rowIndex).click()
}

export const DataSourceUtils = {
  deleteDataSourceRow,
  getDataSourcePlaceholderReferenceEditor,
  getDataSourceReferenceEditor,
  getDataSourceReferenceValidationError,
  getDataSourceTable,
}
