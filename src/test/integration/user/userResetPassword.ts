import { Assessment, Cycle } from 'meta/assessment'
import { AuthProvider, User } from 'meta/user'
import { AuthProviderLocalProps } from 'meta/user/userAuth'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { UserProviderController } from 'server/controller/userProvider'

import { userMockTest, userMockTestPassword } from 'test/integration/mock/user'

import { assessmentParams } from '../mock/assessment'

export default (): void =>
  describe('User Reset Password', () => {
    // test1
    const userMockTestNewPassword = '$2b$10$PsmikkFaWlVuMJ/CS189/e6r/H3.W0fTZG2mRhCNZEFosG8A/Ibmm'
    let assessment: Assessment
    let cycle: Cycle
    let user: User
    let resetPasswordUuid: string

    beforeAll(async () => {
      assessment = await AssessmentController.getOne({ assessmentName: assessmentParams.props.name })
      const [first] = assessment.cycles
      cycle = first
      user = await UserController.getOne({ email: userMockTest.email })
    })

    it('Send change password request', async () => {
      const resetPasswordRequest = await UserController.createResetPassword({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        user,
      })
      const otherResetPasswordRequest = await UserController.createResetPassword({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        user,
      })
      resetPasswordUuid = resetPasswordRequest.uuid

      expect(resetPasswordRequest).toHaveProperty('uuid')
      expect(resetPasswordRequest.changedAt).toBeNull()
      expect(resetPasswordRequest.userId).toBe(user.id)
      expect(resetPasswordRequest.uuid).toBe(otherResetPasswordRequest.uuid)
    })

    it('Change password', async () => {
      const userResetPassword = await UserController.changePassword({
        email: user.email,
        password: userMockTestNewPassword,
        resetPasswordUuid,
      })

      expect(userResetPassword).not.toBeNull()
      expect(userResetPassword.changedAt).not.toBeNull()
      expect(userResetPassword.active).toBeFalsy()
    })

    it('Verify changed password', async () => {
      const userAuthProviders = await UserProviderController.read<AuthProviderLocalProps>({
        user,
        provider: AuthProvider.local,
      })

      const [userAuthProvider] = userAuthProviders

      expect(userAuthProvider.props.password).not.toEqual(userMockTestPassword)
      expect(userAuthProvider.props.password).toEqual(userMockTestNewPassword)
    })
  })
