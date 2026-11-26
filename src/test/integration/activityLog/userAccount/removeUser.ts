import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { userMockKeep } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect remove user to write activity log', async () => {
    const { user } = testContext.activityLog
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { roles: _, ...userToRemove } = await UserController.getOne({ email: userMockKeep.email })

    await UserController.remove({ user, userToRemove })

    await ActivityLogAssertions.expectLastActivityLog({
      message: ActivityLogMessage.userRemove,
      section: 'users',
      target: { user: userToRemove },
      user,
    })
  })
}
