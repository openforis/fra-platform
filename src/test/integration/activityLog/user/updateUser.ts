import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update user to write activity log', async () => {
    const { assessment, cycle, user } = testContext.activityLog
    const props = { ...user.props, surname: 'Updated surname' }

    const updatedUser = await UserController.update({
      assessment,
      cycle,
      user,
      userEditForm: { user: { email: user.email, id: user.id, props, uuid: user.uuid } },
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { roles: _, ...userNoRoles } = updatedUser

    // logged without assessment, cycle and country
    await ActivityLogAssertions.expectLastActivityLog({
      message: ActivityLogMessage.userUpdate,
      section: 'users',
      target: { user: { ...userNoRoles, props } },
      user,
    })
  })
}
