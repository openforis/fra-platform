import { User } from '@meta/user'
import { userMockTest } from '@test/integration/mock/user'

import { UserController } from '@server/controller'

export default (): void =>
  describe('User Reset Password', () => {
    let user: User
    let resetPasswordUuid: string

    beforeAll(async () => {
      user = await UserController.read({ user: { email: userMockTest.email } })
    })

    it('Send change password request', async () => {
      const changePasswordRequest = await UserController.sendResetPasswordRequest({ user })
      resetPasswordUuid = changePasswordRequest.uuid

      expect(changePasswordRequest).toHaveProperty('uuid')
      expect(changePasswordRequest.changedAt).toBeNull()
      expect(changePasswordRequest.userId).toBe(user.id)
    })

    it('Change Password', async () => {
      const userResetPassword = await UserController.changePassword({
        user,
        password: '$2a$10$wQYGIsPB5ad9PS87/kghmehFubRlj3oC94PfReoliNYvQ.9/1J.Le',
        resetPasswordUuid,
      })

      expect(userResetPassword).not.toBeNull()
      expect(userResetPassword.changedAt).not.toBeNull()
    })
  })
