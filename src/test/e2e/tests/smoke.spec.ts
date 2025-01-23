import { expect, test } from '@playwright/test'

/**
 * Example of successful test
 */

test('basic smoke test', async ({ page }) => {
  await page.goto('/')

  expect(await page.title()).toBeTruthy()
})
