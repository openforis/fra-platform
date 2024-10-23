import { Assessment, Cycle } from 'meta/assessment'
import { Lang } from 'meta/lang'
import { RoleName, User, UserInvitation, UserStatus } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

import { assessmentParams } from 'test/integration/mock/assessment'
import { userMockTest, userMockUnknown } from 'test/integration/mock/user'

type TestContext = {
  assessment: Assessment
  cycle: Cycle
  user: User
  userInvitation?: UserInvitation
}

export default (): void =>
  describe('User Invite', () => {
    let testContext: TestContext

    beforeAll(async () => {
      testContext.assessment = await AssessmentController.getOne({ assessmentName: assessmentParams.props.name })
      testContext.cycle = testContext.assessment.cycles.at(0)
      testContext.user = await UserController.getOne({ email: userMockTest.email })
    })

    it('Invite new user as Collaborator', async () => {
      const { assessment, cycle, user } = testContext
      const { userInvitation, user: invitedUser } = await UserController.invite({
        assessment,
        countryIso: 'X01',
        cycle,
        email: userMockUnknown.email,
        roleName: RoleName.COLLABORATOR,
        user,
        lang: Lang.en,
      })

      // verify user invitation exists and fields are correct
      expect(userInvitation).toBeDefined()
      expect(userInvitation.invitedByUserUuid).toBe(user.uuid)
      expect(userInvitation.role).toBe(RoleName.COLLABORATOR)
      expect(userInvitation.countryIso).toBe('X01')
      // verify user status is invitationPending
      expect(invitedUser.status).toBe(UserStatus.invitationPending)
      // verify no active role exists yet
      expect(invitedUser.roles).toHaveLength(0)

      // User accepts invitation with his own email and password
      const acceptedUser = await UserController.acceptInvitation({
        assessment,
        cycle,
        user: invitedUser,
        userInvitation,
      })

      // verify user status is active and role is created
      expect(acceptedUser.status).toBe(UserStatus.active)
      expect(acceptedUser.roles).toHaveLength(1)
      expect(acceptedUser.roles[0].countryIso).toBe('X01')
      expect(acceptedUser.roles[0].role).toBe(RoleName.COLLABORATOR)
    })

    it('Invite the user as National Correspondent to a country', async () => {
      const { assessment, cycle, user } = testContext
      const { userInvitation, user: invitedUser } = await UserController.invite({
        assessment,
        countryIso: 'X02',
        cycle,
        email: userMockUnknown.email,
        roleName: RoleName.NATIONAL_CORRESPONDENT,
        user,
        lang: Lang.en,
      })

      // Save userInvitation in testContext for next test
      testContext.userInvitation = userInvitation

      // invite same userA as National Correspondent to X02
      // verify user invitation exists and fields are correct
      expect(userInvitation).toBeDefined()
      expect(userInvitation.invitedByUserUuid).toBe(user.uuid)
      expect(userInvitation.role).toBe(RoleName.NATIONAL_CORRESPONDENT)
      expect(userInvitation.countryIso).toBe('X02')
      // verify user status is active, and he is only collaborator of X01
      expect(invitedUser.status).toBe(UserStatus.active)

      const filteredRoles = invitedUser.roles.filter(
        (role) => role.countryIso === 'X01' && role.role === RoleName.COLLABORATOR
      )
      expect(filteredRoles.length).toBe(1)
    })

    it('Invite the user as Reviewer to the same country', async () => {
      const { assessment, cycle, user } = testContext
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
      const { assessment, cycle, userInvitation } = testContext
      const { user } = await UserController.findByInvitation({ invitationUuid: userInvitation.uuid })

      // UserA accept invitation National Correspondant to X02
      // verify user status is active and he is collaborator of X01 and National Correspondant of X02
      const invitedUser = await UserController.acceptInvitation({ assessment, cycle, user, userInvitation })

      expect(invitedUser.status).toBe(UserStatus.active)

      const filteredRoles = invitedUser.roles.filter(
        (role) =>
          (role.countryIso === 'X01' && role.role === RoleName.COLLABORATOR) ||
          (role.countryIso === 'X02' && role.role === RoleName.NATIONAL_CORRESPONDENT)
      )
      expect(filteredRoles.length).toBe(2)
    })

    afterAll(async () => {
      const { user } = testContext
      await UserController.remove({ userToRemove: userMockUnknown, user })
    })
  })
