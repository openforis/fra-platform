import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { userMockKeep, userMockMerge } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

/**
 * Note: MergeUsers is utility - no usages in the platform!
 */
export default (): void => {
  test('Expect merge users to write activity log', async () => {
    const { user } = testContext.activityLog
    const userToKeep = await UserController.getOne({ email: userMockKeep.email })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { roles: _, ...userToRemove } = await UserController.getOne({ email: userMockMerge.email })

    await UserController.mergeUsers({ user, userIdToKeep: userToKeep.id, userIdToRemove: userToRemove.id })

    const userKept = await UserController.getOne({ email: userMockKeep.email })

    await ActivityLogAssertions.expectLastActivityLog({
      message: ActivityLogMessage.usersMerge,
      section: 'users',
      target: { userKept, userRemoved: userToRemove },
      user,
    })
  })
}
