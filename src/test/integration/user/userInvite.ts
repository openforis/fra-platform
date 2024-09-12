import { Assessment, Cycle } from 'meta/assessment'
import { Lang } from 'meta/lang'
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
        countryIso: 'X01',
        cycle,
        email: userMockUnknown.email,
        roleName: RoleName.COLLABORATOR,
        user,
        lang: Lang.en,
      })

      // verify invitation exists
      expect(userRole).toHaveProperty('invitationUuid')
      // verify user status is invitationPending
      expect(invitedUser.status).toBe(UserStatus.invitationPending)
      // User accepts invitation with his own email and password
      expect(userRole.acceptedAt).toBeNull()

      // verify user status is active and he is collaborator of X01
      await UserController.acceptInvitation({ assessment, cycle, user: invitedUser, userRole })

      expect(invitedUser.status).toBe(UserStatus.active)
    })

    it('Invite the user as National Correspondent to a country', async () => {
      const { user: invitedUser, userRole: invitedUserRole } = await UserController.invite({
        assessment,
        countryIso: 'X02',
        cycle,
        email: userMockUnknown.email,
        roleName: RoleName.NATIONAL_CORRESPONDENT,
        user,
        lang: Lang.en,
      })

      userRole = invitedUserRole

      // invite same userA as National Correspondent to X02
      // verify user status is active, and he is only collaborator of X01
      expect(invitedUser.status).toBe(UserStatus.active)

      const filteredRoles = invitedUser.roles.filter(
        (role) => role.countryIso === 'X01' && role.role === RoleName.COLLABORATOR
      )
      expect(filteredRoles.length).toBe(1)
    })

    it('Invite the user as Reviewer to the same country', async () => {
      // invite same userA as Reviewer to X02
      // verify Controller throws exception since user has a pending invitation for X02 already
      await expect(
        UserController.invite({
          assessment,
          countryIso: 'X02',
          cycle,
          email: userMockUnknown.email,
          roleName: RoleName.REVIEWER,
          user,
          lang: Lang.en,
        })
      ).rejects.toThrowError('duplicate key')
    })

    it('User accept invitation as National Correspondant', async () => {
      const { user } = await UserController.findByInvitation({ invitationUuid: userRole.invitationUuid })

      // UserA accept invitation National Correspondant to X02
      // verify user status is active and he is collaborator of X01 and National Correspondant of X02
      const invitedUser = await UserController.acceptInvitation({ assessment, cycle, user, userRole })

      expect(invitedUser.status).toBe(UserStatus.active)

      const filteredRoles = invitedUser.roles.filter(
        (role) =>
          (role.countryIso === 'X01' && role.role === RoleName.COLLABORATOR) ||
          (role.countryIso === 'X02' && role.role === RoleName.NATIONAL_CORRESPONDENT)
      )
      expect(filteredRoles.length).toBe(2)
    })

    afterAll(async () => {
      await UserController.remove({ userToRemove: userMockUnknown, user })
    })
  })
