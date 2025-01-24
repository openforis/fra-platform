import { expect, test } from '@playwright/test'

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/FRA platform/, { timeout: 10000 })
  const headerLogo = await page.getByRole('img', { name: 'FAO' })
  await expect(headerLogo).toBeVisible()
  const headerTitle = await page.getByText('Global Forest Resources Assessment').first()
  await expect(headerTitle).toHaveText('Global Forest Resources Assessment')
})
