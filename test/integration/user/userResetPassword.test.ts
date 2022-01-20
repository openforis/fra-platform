import { AuthProvider, User } from '@meta/user'
import { userMockTest, userMockTestPassword } from '@test/integration/mock/user'

import { UserController, UserProviderController } from '@server/controller'

export default (): void =>
  describe('User Reset Password', () => {
    const userMockTestNewPassword = '$2a$10$wQYGIsPB5ad9PS87/kghmehFubRlj3oC94PfReoliNYvQ.9/1J.Le'
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
      expect(otherResetPasswordRequest).toBeNull()
    })

    it('Change password', async () => {
      const userResetPassword = await UserController.changePassword({
        user,
        password: userMockTestNewPassword,
        resetPasswordUuid,
      })

      expect(userResetPassword).not.toBeNull()
      expect(userResetPassword.changedAt).not.toBeNull()
    })

    it('Verify changed password', async () => {
      const userProvider = await UserProviderController.read({ user, provider: AuthProvider.local })

      expect(userProvider.props.password).not.toEqual(userMockTestPassword)
      expect(userProvider.props.password).toEqual(userMockTestNewPassword)
    })
  })
