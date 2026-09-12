import { expect, Page } from '@playwright/test'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName, AssessmentNames } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'

import { DOMUtils } from './dom'
import { MailUtil } from './Mail'
import { TestUserData } from './User'

export type AssessmentConfig = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
}

export const fraConfig: AssessmentConfig = {
  assessmentName: AssessmentNames.fra,
  countryIso: 'X01',
  cycleName: CycleNames._2025,
}

export const panEuropeanConfig: AssessmentConfig = {
  assessmentName: AssessmentNames.panEuropean,
  countryIso: 'FIN',
  cycleName: CycleNames._2025,
}

const adminInvite = async (
  page: Page,
  testUser: TestUserData,
  config: AssessmentConfig = fraConfig
): Promise<string> => {
  const { assessmentName, countryIso, cycleName } = config
  const { email, name, role, surname } = testUser

  await page.goto(`/assessments/${assessmentName}/${cycleName}/${countryIso}/home/collaborators`)
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

const adminConfirmsNoPending = async (
  page: Page,
  fullName: string,
  config: AssessmentConfig = fraConfig
): Promise<void> => {
  const { assessmentName, countryIso, cycleName } = config

  await page.goto(`/assessments/${assessmentName}/${cycleName}/${countryIso}/home/collaborators`)

  const card = page.locator('.home-user-card').filter({ hasText: fullName })
  await expect(card).toBeVisible()
  await expect(card.locator('.invitation-badge')).toHaveCount(0)
}

const fillRolePropsForm = async (page: Page): Promise<void> => {
  await expect(page.locator('.user-form')).toBeVisible()
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
  fillRolePropsForm,
}
