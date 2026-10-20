import { type Browser, type Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { type CountryIso } from 'meta/area/countryIso'
import { type AssessmentName } from 'meta/assessment/assessment'
import { type CycleName } from 'meta/assessment/cycle'
import { type RoleName } from 'meta/user/role/name'

import { InviteApi } from 'test/e2e/api/invite'
import { test as base } from 'test/e2e/fixtures/auth'
import { type TestUserData, UserUtils } from 'test/e2e/utils/User'

export type UserSeed = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  role: RoleName
}

type TestUser = TestUserData & {
  page: Page
}

type UserOptions = {
  userSeed: UserSeed | undefined
}

type UserFixtures = {
  // A new user with the role given in userSeed, logged in on a page of their own
  user: TestUser
  // A second user invited with the same userSeed
  otherUser: TestUser
  userPage: Page
}

type NewUserProps = {
  authenticatedPage: Page
  baseURL: string | undefined
  browser: Browser
  userSeed: UserSeed | undefined
}

const _withNewUser = async (props: NewUserProps, provide: (user: TestUser) => Promise<void>): Promise<void> => {
  const { authenticatedPage, baseURL, browser, userSeed } = props
  if (!userSeed) throw new Error('The user fixtures need the userSeed option: test.use({ userSeed: { ... } })')

  const testUser = UserUtils.createTestUser(enTranslation.user.roles[userSeed.role])
  const invitationPath = await InviteApi.create(authenticatedPage, { ...userSeed, testUser })

  // Fresh context: accepting the invitation logs in as the invited user
  const context = await browser.newContext({ baseURL })
  const page = await context.newPage()
  await InviteApi.accept(page, { invitationPath, testUser })

  await provide({ ...testUser, page })

  await context.close()
}

export const test = base.extend<UserOptions & UserFixtures>({
  userSeed: [undefined, { option: true }],

  user: async ({ authenticatedPage, baseURL, browser, userSeed }, use): Promise<void> =>
    _withNewUser({ authenticatedPage, baseURL, browser, userSeed }, use),

  otherUser: async ({ authenticatedPage, baseURL, browser, userSeed }, use): Promise<void> =>
    _withNewUser({ authenticatedPage, baseURL, browser, userSeed }, use),

  userPage: async ({ user }, use): Promise<void> => {
    await use(user.page)
  },
})

export { expect } from '@playwright/test'
