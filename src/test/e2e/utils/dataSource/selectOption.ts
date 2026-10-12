import { Page } from '@playwright/test'

import { getFieldCell } from './_cells'

type SelectField = 'type' | 'variables' | 'year'

// Editing must be on, the selects are disabled otherwise
export const selectOption = async (page: Page, text: string, field: SelectField, optionName: string): Promise<void> => {
  const cell = await getFieldCell(page, text, field)
  await cell.locator('.select__wrapper').click()
  await page.keyboard.type(optionName)
  await page.getByRole('option', { name: optionName, exact: true }).click()
  await page.keyboard.press('Escape')
}

// Removes the last picked option, editing must be on
export const clearOption = async (page: Page, text: string, field: SelectField): Promise<void> => {
  const cell = await getFieldCell(page, text, field)
  await cell.locator('.select__wrapper').click()
  await page.keyboard.press('Backspace')
  await page.keyboard.press('Escape')
}
