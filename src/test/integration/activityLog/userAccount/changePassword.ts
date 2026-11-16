import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { UserController } from 'server/controller/user'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { userMockKeep } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect change password to write activity log', async () => {
    const { assessment, cycle } = testContext.activityLog
    const user = await UserController.getOne({ email: userMockKeep.email })
    const resetPassword = await UserController.createResetPassword({
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
      user,
    })

    await UserController.changePassword({
      email: user.email,
      password: 'changed',
      resetPasswordUuid: resetPassword.uuid,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      message: ActivityLogMessage.userPasswordChange,
      section: 'users',
      target: { email: user.email, usersResetPasswordUuid: resetPassword.uuid },
      user,
    })
  })
}
