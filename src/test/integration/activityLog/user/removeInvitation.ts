import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect remove invitation to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { activityLogInvitedUser, activityLogUserInvitation } = testContext

    await UserController.removeInvitation({
      assessment,
      countryIso: country.countryIso,
      cycle,
      invitationUuid: activityLogUserInvitation.uuid,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.invitationRemove,
      section: 'users',
      target: {
        role: activityLogUserInvitation.role,
        user: activityLogInvitedUser.props.name,
        userUuid: activityLogInvitedUser.uuid,
      },
    })
  })
}
