import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { RoleName } from 'meta/user/role/name'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { getTargetUser } from 'test/integration/activityLog/userRole/getTargetUser'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update roles to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const targetUser = await getTargetUser(cycle)
    const { countryIso } = country

    await UserController.update({
      assessment,
      countryIso,
      cycle,
      user,
      userEditForm: {
        roles: {
          [RoleName.ADMINISTRATOR]: false,
          [RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]: [],
          [RoleName.COLLABORATOR]: [],
          [RoleName.NATIONAL_CORRESPONDENT]: [countryIso],
          [RoleName.REVIEWER]: [],
          [RoleName.VIEWER]: [],
        },
        user: targetUser,
      },
    })

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      cycle,
      message: ActivityLogMessage.userRolesUpdate,
      section: 'users',
      target: { roles: [{ countryIso, role: RoleName.NATIONAL_CORRESPONDENT }], userUuid: targetUser.uuid },
      user,
    })
  })
}
