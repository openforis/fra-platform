import { expect, Locator, Page } from '@playwright/test'

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

const getDataSourceTypeCell = (page: Page, text: string): Promise<Locator> => getDataSourceFieldCell(page, text, 'type')
const getDataSourceVariablesCell = (page: Page, text: string): Promise<Locator> =>
  getDataSourceFieldCell(page, text, 'variables')
const getDataSourceYearCell = (page: Page, text: string): Promise<Locator> => getDataSourceFieldCell(page, text, 'year')
const getDataSourceCommentsCell = (page: Page, text: string): Promise<Locator> =>
  getDataSourceFieldCell(page, text, 'comments')

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
  addDataSource,
  deleteDataSourceRow,
  getDataSourceCommentsCell,
  getDataSourceReferenceEditor,
  getDataSourceReferenceValidationError,
  getDataSourceTable,
  getDataSourceTypeCell,
  getDataSourceVariablesCell,
  getDataSourceYearCell,
}
