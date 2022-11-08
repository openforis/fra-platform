import { expect, test } from '@playwright/test'

test.beforeAll(() => {
  console.log('beforeall')
  // init user
  // init assessment
  // init cycle
})

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('localhost:9000')

  await expect(page).toHaveTitle(/FRA platform/)
  // const headerTitle = await page.getByRole('heading', { level: 1, name: 'Global Forest Resources Assessment' })
  const headerLogo = await page.getByRole('img', { name: 'FAO' })
  await expect(headerLogo).toBeVisible()
  const headerTitle = await page.getByText('Global Forest Resources Assessment').first()
  await expect(headerTitle).toHaveText('Global Forest Resources Assessment')
})
