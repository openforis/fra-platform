import { BaseProtocol, DB } from '@server/db'
import { UserResetPassword } from '@meta/user'
import { UserProviderRepository, UserRepository, UserResetPasswordRepository } from '@server/repository'

export const changePassword = async (
  props: {
    email: string
    password: string
    resetPasswordUuid: string
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword | null> => {
  const { email, password, resetPasswordUuid } = props

  return client.tx(async (t) => {
    const userResetPassword = await UserResetPasswordRepository.read({ uuid: resetPasswordUuid })
    if (!userResetPassword?.active) return null
    const user = await UserRepository.read({ user: { id: userResetPassword.userId } })
    if (user.email !== email) return null
    const userAuthProvider = await UserProviderRepository.update({ user: { id: userResetPassword.userId }, password })
    if (!userAuthProvider) return null
    return UserResetPasswordRepository.update({ uuid: userResetPassword.uuid }, t)
  })
}
