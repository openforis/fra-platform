import { RoleName, UserStatus } from '@core/meta/user'
import { AssessmentController, UserController } from '@server/controller'
import { assessmentParams } from '@test/integration/mock/assessment'
import { userMockAdmin, userMockUnknown } from '@test/integration/mock/user'

export default (): void =>
  describe('User Invite', () => {
    it('Invite new user', async () => {
      const assessment = await AssessmentController.read({ name: assessmentParams.props.name })
      const user = await UserController.read({ user: { email: userMockAdmin.email } })
      const { userRole, user: invitedUser } = await UserController.invite({
        assessment,
        countryIso: 'ALB',
        cycleUuid: assessment.cycles[0].uuid,
        email: userMockUnknown.email,
        roleName: RoleName.COLLABORATOR,
        user,
      })

      // verify invitation exists
      expect(userRole).toHaveProperty('invitationUuid')
      // verify user status is invitationPending
      expect(invitedUser.status).toBe(UserStatus.invitationPending)
      // User accepts invitation with his own email and password
      expect(userRole.acceptedAt).toBeNull()

      // verify user status is active and he is collaborator of ALB
      await UserController.acceptInvitation({ user: invitedUser, userRole })

      expect(invitedUser.status).toBe(UserStatus.active)

      await UserController.remove({ user: invitedUser })
    })
  })
