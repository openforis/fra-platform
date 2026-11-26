import { Locator, Page } from '@playwright/test'

export const getTable = (page: Page): Locator => page.locator('.data-grid.data-source')

export const getReferenceCells = (page: Page): Locator => getTable(page).locator('.datasource-column-reference')

// get data source by text
export const getReferenceCellByText = (page: Page, text: string): Locator =>
  getReferenceCells(page).filter({ hasText: text })

export const getRowClass = async (page: Page, text: string): Promise<string> => {
  const className = await getReferenceCellByText(page, text).getAttribute('class')
  const rowClass = className?.match(/datasource-row-\S+/)?.[0]
  if (!rowClass) throw new Error(`Could not determine data source row class from "${className}"`)
  return rowClass
}

export const getFieldCell = async (page: Page, text: string, field: string): Promise<Locator> => {
  const rowClass = await getRowClass(page, text)
  return getTable(page).locator(`.${rowClass}.datasource-column-${field}`)
}
