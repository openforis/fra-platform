import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { getTargetUser } from 'test/integration/activityLog/userRole/getTargetUser'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update role props to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const targetUser = await getTargetUser(cycle)
    const role = targetUser.roles.at(0)
    const props = { organization: 'Test organization' }

    await UserController.update({
      assessment,
      countryIso: country.countryIso,
      cycle,
      user,
      userEditForm: { role: { props, uuid: role.uuid }, user: targetUser },
    })

    const updatedRole = (await getTargetUser(cycle)).roles.at(0)

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      cycle,
      message: ActivityLogMessage.userRoleUpdateProps,
      section: 'users',
      target: { roles: [updatedRole], userUuid: targetUser.uuid },
      user,
    })
  })
}
