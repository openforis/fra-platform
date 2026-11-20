import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { CollaboratorEditPropertyType, CollaboratorPermissions } from 'meta/user/role/collaborator'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { getTargetUser } from 'test/integration/activityLog/userRole/getTargetUser'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update role permissions to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const targetUser = await getTargetUser(cycle)
    const role = targetUser.roles.at(0)
    const permissions: CollaboratorPermissions = {
      [CollaboratorEditPropertyType.descriptions]: [],
      [CollaboratorEditPropertyType.tableData]: [],
    }

    await UserController.update({
      assessment,
      countryIso: country.countryIso,
      cycle,
      user,
      userEditForm: { role: { permissions, uuid: role.uuid }, user: targetUser },
    })

    const updatedRole = (await getTargetUser(cycle)).roles.at(0)
    // TODO: Fix timestamp format: use 1184 in db.ts
    const createdAt = new Date(updatedRole.createdAt).toISOString()

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      cycle,
      message: ActivityLogMessage.userRoleUpdatePermissions,
      section: 'users',
      target: { roles: [{ ...updatedRole, createdAt }], userUuid: targetUser.uuid },
      user,
    })
  })
}
