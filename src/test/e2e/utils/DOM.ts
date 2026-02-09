import { expect, Locator, Page } from '@playwright/test'

// Eg. { id: 'telephone-field' }
type Selector = Record<string, string>

const toSelector = (selector: Selector): string => {
  const [key, value] = Object.entries(selector)[0]
  return `[${key}="${value}"]`
}

const fillInput = async (page: Page, selector: Selector, value: string): Promise<void> => {
  await page.fill(toSelector(selector), value)
}

const fillWYSIWYG = async (page: Page, selector: Selector, value: string): Promise<void> => {
  await page.locator(`${toSelector(selector)} [contenteditable="true"]`).fill(value)
}

const nestedSelectOption = async (page: Page, selector: Selector, optionName: string, exact = true): Promise<void> => {
  await page.locator(toSelector(selector)).click()
  await page.keyboard.type(optionName)
  await page.getByRole('option', { name: optionName, exact }).click()
}

const selectOption = async (page: Page, selector: Selector, optionName: string, exact = true): Promise<void> => {
  await page.locator(toSelector(selector)).click()
  await page.getByRole('option', { name: optionName, exact }).click()
}

const elementNotExists = async (locator: Locator): Promise<void> => {
  await expect(locator).toHaveCount(0)
}

export const DOMUtils = {
  elementNotExists,
  fillInput,
  fillWYSIWYG,
  nestedSelectOption,
  selectOption,
}
