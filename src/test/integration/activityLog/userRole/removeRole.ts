import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Users } from 'meta/user/users'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { getTargetUser } from 'test/integration/activityLog/userRole/getTargetUser'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect remove role to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const targetUser = await getTargetUser(cycle)
    const { countryIso } = country
    const role = Users.getRole(targetUser, countryIso, cycle)

    await UserController.removeRole({ assessment, countryIso, cycle, target: targetUser, user })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.userRoleDeleteRole,
      section: 'users',
      target: { countryIso, role: role.role, user: Users.getFullName(targetUser), userUuid: targetUser.uuid },
    })
  })
}
