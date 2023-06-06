import { Assessment, Cycle } from 'meta/assessment'
import { RoleName, User, UserRole, UserStatus } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { userMockTest, userMockUnknown } from 'test/integration/mock/user'

export default (): void =>
  describe('User Invite', () => {
    let assessment: Assessment
    let cycle: Cycle
    let user: User
    let userRole: UserRole<RoleName>

    beforeAll(async () => {
      assessment = await AssessmentController.getOne({ assessmentName: assessmentParams.props.name })
      const [first] = assessment.cycles
      cycle = first
      user = await UserController.getOne({ email: userMockTest.email })
    })

    it('Invite new user as Collaborator', async () => {
      const { userRole, user: invitedUser } = await UserController.invite({
        assessment,
        countryIso: 'ALB',
        cycle,
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
      await UserController.acceptInvitation({ assessment, cycle, user: invitedUser, userRole })

      expect(invitedUser.status).toBe(UserStatus.active)
    })

    it('Invite the user as National Correspondant to a country', async () => {
      const { user: invitedUser, userRole: invitedUserRole } = await UserController.invite({
        assessment,
        countryIso: 'AFG',
        cycle,
        email: userMockUnknown.email,
        roleName: RoleName.NATIONAL_CORRESPONDENT,
        user,
      })

      userRole = invitedUserRole

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
          cycle,
          email: userMockUnknown.email,
          roleName: RoleName.REVIEWER,
          user,
        })
      ).rejects.toThrowError('duplicate key')
    })

    it('User accept invitation as National Correspondant', async () => {
      const { user } = await UserController.findByInvitation({ invitationUuid: userRole.invitationUuid })

      // UserA accept invitation National Correspondant to AFG
      // verify user status is active and he is collaborator of ALB and National Correspondant of AFG
      const invitedUser = await UserController.acceptInvitation({ assessment, cycle, user, userRole })

      expect(invitedUser.status).toBe(UserStatus.active)

      const filteredRoles = invitedUser.roles.filter(
        (role) =>
          (role.countryIso === 'ALB' && role.role === RoleName.COLLABORATOR) ||
          (role.countryIso === 'AFG' && role.role === RoleName.NATIONAL_CORRESPONDENT)
      )
      expect(filteredRoles.length).toBe(2)
    })

    afterAll(async () => {
      await UserController.remove({ userToRemove: userMockUnknown, user })
    })
  })
