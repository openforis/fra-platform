import { Page } from '@playwright/test'

const selectOption = async (page: Page, selector: string, optionName: string, exact = true): Promise<void> => {
  await page.locator(selector).click()
  await page.getByRole('option', { name: optionName, exact }).click()
}

export const DOMUtils = {
  selectOption,
}
