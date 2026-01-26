import { expect, test } from '@playwright/test'

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('/')
  const title = /FRA Platform | Global Forest Resources Data | Food and Agriculture Organization of the United Nations/
  await expect(page).toHaveTitle(title, { timeout: 10000 })
  const headerLogo = await page.getByRole('img', { name: 'FAO', exact: true })
  await expect(headerLogo).toBeVisible()
  const headerTitle = await page.getByText('Global Forest Resources Assessment', { exact: true }).first()
  await expect(headerTitle).toHaveText('Global Forest Resources Assessment')
})
