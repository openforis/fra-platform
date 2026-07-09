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

const waitForResponse = (page: Page, pathSubstring: string, method: string): Promise<unknown> =>
  page.waitForResponse((response) => response.url().includes(pathSubstring) && response.request().method() === method)

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

const unlockEditing = async (page: Page): Promise<void> => {
  // Unlock editing if not already unlocked
  await page.locator('.btn-lock').waitFor({ timeout: 5000 })

  const lockedButton = page.locator('.btn-lock.locked')
  if (await lockedButton.isVisible()) await lockedButton.click()
}

// Navigate the platform using the left navigation
const sidebarNavigate = async (page: Page, section: string, subSection: string): Promise<void> => {
  await page.locator('.nav-section__header', { hasText: section }).click()
  await page.locator('.nav-section__item', { hasText: subSection }).click()
}

export const DOMUtils = {
  elementNotExists,
  fillInput,
  fillWYSIWYG,
  nestedSelectOption,
  selectOption,
  sidebarNavigate,
  unlockEditing,
  waitForResponse,
}
