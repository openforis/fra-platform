import { Locator, Page } from '@playwright/test'

import { tableContainer } from './tableContainer'

export const cellLocator = (page: Page, variableName: string, colName: string, tableName?: string): Locator => {
  const selector = `[id$="variableName_${variableName}_colName_${colName}"]`
  return tableName ? tableContainer(page, tableName).locator(selector) : page.locator(selector)
}
