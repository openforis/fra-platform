import { expect, Locator, Page, Response } from '@playwright/test'

import { Timeouts } from 'test/e2e/config/timeouts'

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

const waitForResponse = (page: Page, pathSubstring: string, method: string): Promise<Response> =>
  page.waitForResponse((response) => response.url().includes(pathSubstring) && response.request().method() === method)

// Only matches a request sent after this call, so the response to a request the page sent earlier can't match
const waitForResponseToNewRequest = async (page: Page, pathSubstring: string, method: string): Promise<Response> => {
  const request = await page.waitForRequest((r) => r.url().includes(pathSubstring) && r.method() === method)
  const response = await request.response()
  if (!response) throw new Error(`${method} ${request.url()} got no response`)
  return response
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

const _unlockEditing = async (page: Page): Promise<void> => {
  await page.locator('.btn-lock.locked').click()
}

// Unlock editing if it is locked; do nothing if it is already unlocked
const ensureEditingUnlocked = async (page: Page): Promise<void> => {
  await page.locator('.btn-lock').waitFor({ timeout: Timeouts.short })

  const editingIsLocked = await page.locator('.btn-lock.locked').isVisible()
  if (editingIsLocked) await _unlockEditing(page)
}

// Navigate the platform using the left navigation
const sidebarNavigate = async (page: Page, section: string, subSection: string): Promise<void> => {
  await page.locator('.nav-section__header', { hasText: section }).click()
  await page.locator('.nav-section__item', { hasText: subSection }).click()
}

export const DOMUtils = {
  elementNotExists,
  ensureEditingUnlocked,
  fillInput,
  fillWYSIWYG,
  nestedSelectOption,
  selectOption,
  sidebarNavigate,
  waitForResponse,
  waitForResponseToNewRequest,
}
