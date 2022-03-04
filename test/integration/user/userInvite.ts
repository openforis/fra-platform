import { AssessmentController, UserController } from '@server/controller'
import { RoleName, User, UserStatus } from '@meta/user'
import { Assessment } from '@meta/assessment'
import { assessmentParams } from '@test/integration/mock/assessment'
import { userMockTest, userMockUnknown } from '@test/integration/mock/user'

export default (): void =>
  describe('User Invite', () => {
    let assessment: Assessment
    let user: User

    beforeAll(async () => {
      assessment = await AssessmentController.getOne({ name: assessmentParams.props.name })
      user = await UserController.read({ user: { email: userMockTest.email } })
    })

    it('Invite new user as Collaborator', async () => {
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
    })

    it('Invite the user as National Correspondant to a country', async () => {
      const { user: invitedUser } = await UserController.invite({
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
      expect(invitedUser.status).toBe(UserStatus.active)

      const filteredRoles = invitedUser.roles.filter(
        (role) => role.countryIso === 'ALB' && role.role === RoleName.COLLABORATOR
      )
      expect(filteredRoles.length).toBe(1)
    })

    it('Invite the user as Reviewer to the same country', async () => {
      // invite same userA as Reviewer to AFG
      // verify Controller throws exception since user has a pending invitation for AFG already
      await expect(
        UserController.invite({
          assessment,
          countryIso: 'AFG',
          cycleUuid: assessment.cycles[0].uuid,
          email: userMockUnknown.email,
          roleName: RoleName.REVIEWER,
          user,
          url: '',
        })
      ).rejects.toThrowError('duplicate key')
    })

    it('User accept invitation as National Correspondant', async () => {
      let invitedUser = await UserController.read({ user: { email: userMockUnknown.email } })
      const userRole = invitedUser.roles.find(
        (role) => role.countryIso === 'AFG' && role.role === RoleName.NATIONAL_CORRESPONDENT
      )

      // UserA accept invitation National Correspondant to AFG
      // verify user status is active and he is collaborator of ALB and National Correspondant of AFG
      invitedUser = await UserController.acceptInvitation({ user: invitedUser, userRole })

      expect(invitedUser.status).toBe(UserStatus.active)

      const filteredRoles = invitedUser.roles.filter(
        (role) =>
          (role.countryIso === 'ALB' && role.role === RoleName.COLLABORATOR) ||
          (role.countryIso === 'AFG' && role.role === RoleName.NATIONAL_CORRESPONDENT)
      )
      expect(filteredRoles.length).toBe(2)
    })

    afterAll(async () => {
      await UserController.remove({ user: userMockUnknown })
    })
  })
