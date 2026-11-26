import { enTranslation } from 'i18n/resources/en'

import { AssessmentNames } from 'meta/assessment/assessment'
import { Routes } from 'meta/routes/routes'
import { RoleName } from 'meta/user/role/name'

import { InviteApi } from 'test/e2e/api/invite'
import { expect, test } from 'test/e2e/fixtures/user'
import { HeaderUtils } from 'test/e2e/utils/header'
import { fraConfig, panEuropeanConfig } from 'test/e2e/utils/Invite'

const assessmentLabels: Record<string, string> = {
  [AssessmentNames.fra]: enTranslation.fra.labels.short,
  [AssessmentNames.panEuropean]: enTranslation.panEuropean.labels.short,
}

const fraHomePath = Routes.CountryHome.generatePath(fraConfig)
const panEuropeanHomePath = Routes.CountryHome.generatePath(panEuropeanConfig)

test.describe('Header: cycle switcher', () => {
  test.describe('Non-admin user with roles in FRA and Pan-European', () => {
    test.use({ userSeed: { ...fraConfig, role: RoleName.NATIONAL_CORRESPONDENT } })

    test.beforeEach(async ({ authenticatedPage, user }) => {
      // add panEuropean role to the user
      const invitationPath = await InviteApi.create(authenticatedPage, {
        ...panEuropeanConfig,
        role: RoleName.NATIONAL_CORRESPONDENT,
        testUser: user,
      })
      await InviteApi.accept(user.page, { invitationPath, testUser: user })
    })

    test('only shows cycles of the assessment in the url', async ({ userPage }) => {
      await test.step('FRA: shows only FRA cycles', async () => {
        await userPage.goto(fraHomePath)
        const items = await HeaderUtils.getCycleSwitcherItems(userPage)

        expect(items.length).toBeGreaterThan(0)
        items.forEach((item) => expect(item).toContain(assessmentLabels[AssessmentNames.fra]))
      })

      await test.step('Pan-European: shows only Pan-European cycles', async () => {
        await userPage.goto(panEuropeanHomePath)
        const items = await HeaderUtils.getCycleSwitcherItems(userPage)

        items.forEach((item) => expect(item).toContain(assessmentLabels[AssessmentNames.panEuropean]))
      })
    })
  })

  test.describe('Admin', () => {
    test('shows cycles of all assessments', async ({ authenticatedPage }) => {
      await authenticatedPage.goto(fraHomePath)
      const items = await HeaderUtils.getCycleSwitcherItems(authenticatedPage)

      expect(items.some((item) => item.includes(assessmentLabels[AssessmentNames.fra]))).toBe(true)
      expect(items.some((item) => item.includes(assessmentLabels[AssessmentNames.panEuropean]))).toBe(true)
    })
  })
})
