import { RoleName, UserStatus } from '@meta/user'
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
        url: '',
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

      const { user: invitedUser1 } = await UserController.invite({
        assessment,
        countryIso: 'AFG',
        cycleUuid: assessment.cycles[0].uuid,
        email: userMockUnknown.email,
        roleName: RoleName.NATIONAL_CORRESPONDENT,
        user,
        url: '',
      })

      // invite same userA as National Correspondant to AFG
      // verify user status is active and he is only collaborator of ALB
      expect(invitedUser1.status).toBe(UserStatus.active)

      const filteredRoles = invitedUser1.roles.filter(
        (role) => role.countryIso === 'ALB' && role.role === RoleName.COLLABORATOR
      )
      expect(filteredRoles.length).toBe(1)

      // invite same userA as Reviewer to AFG
      // verify Controller throws exception since user has a pending invitation for AFG already

      // await UserController.invite({
      //   assessment,
      //   countryIso: 'AFG',
      //   cycleUuid: assessment.cycles[0].uuid,
      //   email: userMockUnknown.email,
      //   roleName: RoleName.REVIEWER,
      //   user,
      // })

      // UserA accept invitation National Correspondant to AFG
      // verify user status is active and he is collaborator of ALB and National Correspondant of AFG

      // TODO
    })
  })
