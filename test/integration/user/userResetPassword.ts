import { UserController } from '@server/controller/user'
import { UserProviderController } from '@server/controller/userProvider'
import { AuthProvider, User } from '@meta/user'
import { userMockTest, userMockTestPassword } from '@test/integration/mock/user'

export default (): void =>
  describe('User Reset Password', () => {
    // test1
    const userMockTestNewPassword = '$2b$10$PsmikkFaWlVuMJ/CS189/e6r/H3.W0fTZG2mRhCNZEFosG8A/Ibmm'
    let user: User
    let resetPasswordUuid: string

    beforeAll(async () => {
      user = await UserController.read({ user: { email: userMockTest.email } })
    })

    it('Send change password request', async () => {
      const resetPasswordRequest = await UserController.createResetPassword({ user })
      const otherResetPasswordRequest = await UserController.createResetPassword({ user })
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
      const userAuthProvider = await UserProviderController.read({ user, provider: AuthProvider.local })

      expect(userAuthProvider.props.password).not.toEqual(userMockTestPassword)
      expect(userAuthProvider.props.password).toEqual(userMockTestNewPassword)
    })
  })
