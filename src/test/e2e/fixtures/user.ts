import { type Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { type CountryIso } from 'meta/area/countryIso'
import { type AssessmentName } from 'meta/assessment/assessment'
import { type CycleName } from 'meta/assessment/cycle'
import { type RoleName } from 'meta/user/role/name'

import { InviteApi } from 'test/e2e/api/invite'
import { test as base } from 'test/e2e/fixtures/auth'
import { UserUtils } from 'test/e2e/utils/User'

export type UserSeed = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  role: RoleName
}

type UserOptions = {
  userSeed: UserSeed | undefined
}

type UserFixtures = {
  // A page logged in as a freshly invited and registered user with the role given in userSeed
  userPage: Page
}

export const test = base.extend<UserOptions & UserFixtures>({
  userSeed: [undefined, { option: true }],

  userPage: async ({ authenticatedPage, baseURL, browser, userSeed }, use): Promise<void> => {
    if (!userSeed) throw new Error('userPage fixture needs the userSeed option: test.use({ userSeed: { ... } })')

    const testUser = UserUtils.createTestUser(enTranslation.user.roles[userSeed.role])
    const invitationPath = await InviteApi.create(authenticatedPage, { ...userSeed, testUser })

    // Fresh context: accepting the invitation logs in as the invited user
    const context = await browser.newContext({ baseURL })
    const page = await context.newPage()
    await InviteApi.accept(page, { invitationPath, testUser })

    await use(page)

    await context.close()
  },
})

export { expect } from '@playwright/test'
