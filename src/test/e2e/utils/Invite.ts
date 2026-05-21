import { expect, Page } from '@playwright/test'

import { DOMUtils } from './DOM'
import { MailUtil } from './Mail'
import { TestUserData } from './User'

const adminInvite = async (page: Page, testUser: TestUserData): Promise<string> => {
  const { email, name, role, surname } = testUser

  await page.goto('/assessments/fra/2025/X01/home/collaborators')
  await page.getByRole('link', { name: 'Add collaborator' }).click()
  await page.fill('input[name="name"]', name)
  await page.fill('input[name="surname"]', surname)
  await page.fill('input[name="email"]', email)
  await DOMUtils.selectOption(page, { id: 'select-role' }, role)
  await page.getByRole('button', { name: 'Submit' }).click()
  // Wait for the success toast confirming the invite was sent
  await expect(page.getByText(`${email} has been added`)).toBeVisible({ timeout: 10_000 })

  return MailUtil.getInvitationLink(email)
}

const adminConfirmsNoPending = async (page: Page, fullName: string): Promise<void> => {
  await page.goto('/assessments/fra/2025/X01/home/collaborators')
  await page.waitForSelector('.home-user-card', { timeout: 30_000 })

  const card = page.locator('.home-user-card').filter({ hasText: fullName })
  await expect(card).toBeVisible()
  await expect(card.locator('.invitation-badge')).toHaveCount(0)
}

const fillNcAcceptForm = async (page: Page): Promise<void> => {
  await page.waitForSelector('[id="select-user.props.title"]', { timeout: 30_000 })
  await DOMUtils.selectOption(page, { id: 'select-user.props.title' }, 'Mr.')
  await DOMUtils.fillWYSIWYG(page, { id: 'role.props.organization' }, 'Test Organization')
  await DOMUtils.fillInput(page, { id: 'role.props.address.street' }, 'Test Street 1')
  await DOMUtils.fillInput(page, { id: 'role.props.address.zipCode' }, '00100')
  await DOMUtils.fillInput(page, { id: 'role.props.address.city' }, 'Helsinki')
  await DOMUtils.nestedSelectOption(page, { id: 'select-role.props.address.countryIso' }, 'Finland')
  await DOMUtils.fillInput(page, { id: 'role.props.primaryPhoneNumber-phone-number' }, '123456789')
  await DOMUtils.selectOption(page, { id: 'select-role.props.contactPreference.method' }, 'Primary email address')
}

export const InviteUtils = {
  adminConfirmsNoPending,
  adminInvite,
  fillNcAcceptForm,
}
