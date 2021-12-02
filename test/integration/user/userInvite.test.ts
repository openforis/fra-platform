import { RoleNames } from '@core/meta/user'
import { AssessmentController, UserController } from '@server/controller'
import { assessmentParams } from '@test/integration/mock/assessment'
import { userMockAdmin } from '@test/integration/mock/user'

export default (): void =>
  describe('User Invite', () => {
    it('Invite new user', async () => {
      const assessment = await AssessmentController.read({ name: assessmentParams.props.name })
      const user1 = await UserController.read({ user: { email: userMockAdmin.email } })
      const { userInvitation, user } = await UserController.inviteUser({
        assessment,
        countryIso: 'ALB',
        cycleUuid: assessment.cycles[0].uuid,
        email: userMockAdmin.email,
        roleName: RoleNames.COLLABORATOR,
        user: user1,
      })
      expect(userInvitation.userId).toBe(user1.id)
      expect(user.id).toBe(user1.id)
    })
  })
