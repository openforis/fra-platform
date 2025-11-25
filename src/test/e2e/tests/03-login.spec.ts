import { expect, test } from '@playwright/test'

test.describe('Login', () => {
  test('should login with test user credentials', async ({ page }) => {
    await page.goto('/assessments/fra/latest/login')

    await page.click('button:has-text("Sign in with FRA")')

    await page.fill('input[name="email"]', 'test@test.com')
    await page.fill('input[type="password"]', 'password123')

    await page.click('button.button:has-text("Login")')

    await expect(page).toHaveURL('/assessments/fra/latest')

    await expect(page.getByText('Test User')).toBeVisible()
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/assessments/fra/latest/login')

    await page.click('button:has-text("Sign in with FRA")')

    await page.fill('input[name="email"]', 'wrong@email.com')
    await page.fill('input[type="password"]', 'wrongpassword')

    await page.click('button.button:has-text("Login")')

    await expect(page.getByText("We couldn't find any user matching these credentials.")).toBeVisible()
    await expect(
      page.getByText('Make sure you have a valid FRA account or try another authentication method.')
    ).toBeVisible()
  })
})
