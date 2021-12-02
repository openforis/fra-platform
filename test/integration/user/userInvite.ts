import { RoleNames } from '@core/meta/user'
import { AssessmentController, UserController } from '@server/controller'
import { assessmentParams } from '@test/integration/mock/assessment'
import { userMockAdmin, userMockNC } from '@test/integration/mock/user'

export default (): void =>
  describe('User Invite', () => {
    it('Invite new user', async () => {
      const assessment = await AssessmentController.read({ name: assessmentParams.props.name })
      const user = await UserController.read({ user: { email: userMockAdmin.email } })
      await UserController.inviteUser({
        assessment,
        countryIso: 'ALB',
        cycleUuid: assessment.cycles[0].uuid,
        email: userMockNC.email,
        roleName: RoleNames.COLLABORATOR,
        user,
      })
      expect('a').toBe('a')
    })
  })
