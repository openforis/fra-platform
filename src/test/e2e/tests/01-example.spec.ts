import { expect, test } from '@playwright/test'

/**
 * Example of failing test
 */

test.beforeAll(async () => {
  console.log('beforeall')
})

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('/')

  // Add more logging and increase timeout if needed
  await expect(page).toHaveTitle(/FRA platform/, { timeout: 10000 })
  // const headerTitle = await page.getByRole('heading', { level: 1, name: 'Global Forest Resources Assessment' })
  const headerLogo = await page.getByRole('img', { name: 'FAO' })
  await expect(headerLogo).toBeVisible()
  const headerTitle = await page.getByText('Global Forest Resources Assessment').first()
  await expect(headerTitle).toHaveText('Global Forest Resources Assessment')
})
