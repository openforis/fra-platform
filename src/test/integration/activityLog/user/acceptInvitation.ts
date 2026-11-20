import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect accept invitation to write activity log', async () => {
    const { assessment, cycle } = testContext.activityLog
    const { activityLogInvitedUser, activityLogUserInvitation } = testContext

    await UserController.acceptInvitation({
      assessment,
      cycle,
      user: activityLogInvitedUser,
      userInvitation: activityLogUserInvitation,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.invitationAccept,
      section: 'users',
      target: {
        role: activityLogUserInvitation.role,
        user: activityLogInvitedUser.props.name,
        userUuid: activityLogInvitedUser.uuid,
      },
      user: activityLogInvitedUser,
    })
  })
}
