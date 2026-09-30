import { enTranslation } from 'i18n/resources/en'

import { RoleName } from 'meta/user/role/name'

import { expect, test } from 'test/e2e/fixtures/auth'
import { AssessmentConfig, fraConfig, InviteUtils, panEuropeanConfig } from 'test/e2e/utils/Invite'
import { UserUtils } from 'test/e2e/utils/User'

const roles: Array<RoleName> = [
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.REGIONAL_FOCAL_POINT,
  RoleName.REVIEWER,
  RoleName.VIEWER,
]

const assessmentConfigs: Array<AssessmentConfig> = [fraConfig, panEuropeanConfig]

const testConfigs = assessmentConfigs.flatMap((assessment) => roles.map((role) => ({ ...assessment, role })))

// Test creating an invitation through the UI
test.describe('Admin invite form', () => {
  testConfigs.forEach(({ assessmentName, countryIso, cycleName, role }) => {
    const roleLabel = enTranslation.user.roles[role]
    const label = `${roleLabel} (${assessmentName})`

    test(`Admin invites ${label} and sees them pending`, async ({ authenticatedPage }) => {
      const page = authenticatedPage
      const testUser = UserUtils.createTestUser(roleLabel)

      await InviteUtils.adminInvite(page, testUser, { assessmentName, countryIso, cycleName })

      const userCard = page.locator('.home-user-card', { hasText: testUser.fullName })
      await expect(userCard).toBeVisible()
      await expect(userCard.locator('.invitation-badge')).toHaveText('Pending')
    })
  })
})
