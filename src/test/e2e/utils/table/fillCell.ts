import { Page } from '@playwright/test'

import { cellLocator } from './_cellLocator'

export const fillCell = async (page: Page, variableName: string, colName: string, value: string): Promise<void> => {
  const cellInput = cellLocator(page, variableName, colName).locator('input')
  await cellInput.click()
  await cellInput.fill(value)
  await cellInput.blur()
}
