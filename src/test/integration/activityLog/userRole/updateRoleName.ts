import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { RoleName } from 'meta/user/role/name'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { getTargetUser } from 'test/integration/activityLog/userRole/getTargetUser'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update role name to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const targetUser = await getTargetUser(cycle)
    const role = targetUser.roles.at(0)

    await UserController.update({
      assessment,
      countryIso: country.countryIso,
      cycle,
      user,
      userEditForm: { role: { role: RoleName.REVIEWER, uuid: role.uuid }, user: targetUser },
    })

    const updatedRole = (await getTargetUser(cycle)).roles.at(0)
    // TODO: Fix timestamp format: use 1184 in db.ts
    const createdAt = new Date(updatedRole.createdAt).toISOString()

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      cycle,
      message: ActivityLogMessage.userRoleUpdateRole,
      section: 'users',
      target: { roles: [{ ...updatedRole, createdAt }], userUuid: targetUser.uuid },
      user,
    })
  })
}
