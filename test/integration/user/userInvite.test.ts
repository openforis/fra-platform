import { RoleName } from '@core/meta/user'
import { AssessmentController, UserController } from '@server/controller'
import { assessmentParams } from '@test/integration/mock/assessment'
import { userMockAdmin } from '@test/integration/mock/user'

export default (): void =>
  describe('User Invite', () => {
    it('Invite new user', async () => {
      const assessment = await AssessmentController.read({ name: assessmentParams.props.name })
      const userToInvite = await UserController.read({ user: { email: userMockAdmin.email } })
      const { userInvitation } = await UserController.invite({
        assessment,
        countryIso: 'ALB',
        cycleUuid: assessment.cycles[0].uuid,
        email: userMockAdmin.email,
        roleName: RoleName.COLLABORATOR,
        user: userToInvite,
      })

      expect(userInvitation).toHaveProperty('uuid')
      // expect(invitedUser.status).toBe(UserStatus.invitationPending)
      expect(userInvitation.acceptedAt).toBeNull()
    })
  })
