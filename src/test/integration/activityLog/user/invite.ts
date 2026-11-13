import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user/role/name'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { userMockUnknown } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect invite to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog

    const { user: invitedUser, userInvitation } = await UserController.invite({
      assessment,
      countryIso: country.countryIso,
      cycle,
      user,
      userInvitation: {
        email: userMockUnknown.email,
        language: Lang.en,
        name: userMockUnknown.props.name,
        role: RoleName.COLLABORATOR,
        surname: userMockUnknown.props.surname,
      },
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.invitationAdd,
      section: 'users',
      target: { role: userInvitation.role, user: invitedUser.props.name, userUuid: invitedUser.uuid },
    })

    testContext.activityLogInvitedUser = invitedUser
    testContext.activityLogUserInvitation = userInvitation
  })
}
