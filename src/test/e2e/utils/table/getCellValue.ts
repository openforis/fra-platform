import { Page } from '@playwright/test'

import { cellLocator } from './_cellLocator'

export const getCellValue = async (
  page: Page,
  variableName: string,
  colName: string,
  tableName?: string
): Promise<string> => {
  const cell = cellLocator(page, variableName, colName, tableName)
  const input = cell.locator('input')
  if (await input.count()) return input.inputValue()
  const text = await cell.innerText()
  return text.replace(/\s/g, '')
}
