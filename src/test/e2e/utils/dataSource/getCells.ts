import { Locator, Page } from '@playwright/test'

import { getFieldCell, getReferenceCellByText, getRowClass, getTable } from './_cells'

export const getReferenceEditor = (page: Page, text: string): Locator =>
  getReferenceCellByText(page, text).locator('.jodit-wysiwyg')

export const getReferenceValidationError = (page: Page, text: string): Locator =>
  getTable(page).locator('.editorWYSIWYG.validation-error', { hasText: text })

export const getRowUuid = async (page: Page, text: string): Promise<string> => {
  const rowClass = await getRowClass(page, text)
  return rowClass.replace('datasource-row-', '')
}

export const getReferenceCell = (page: Page, text: string): Promise<Locator> => getFieldCell(page, text, 'reference')
export const getTypeCell = (page: Page, text: string): Promise<Locator> => getFieldCell(page, text, 'type')
export const getVariablesCell = (page: Page, text: string): Promise<Locator> => getFieldCell(page, text, 'variables')
export const getYearCell = (page: Page, text: string): Promise<Locator> => getFieldCell(page, text, 'year')
export const getCommentsCell = (page: Page, text: string): Promise<Locator> => getFieldCell(page, text, 'comments')
