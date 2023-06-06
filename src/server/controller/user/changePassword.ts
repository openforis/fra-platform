import { UserResetPassword } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserRepository } from 'server/repository/public/user'
import { UserProviderRepository } from 'server/repository/public/userProvider'
import { UserResetPasswordRepository } from 'server/repository/public/userResetPassword'

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
    if (!userResetPassword) return null

    const user = await UserRepository.getOne({ id: userResetPassword.userId })
    if (user.email !== email) return null

    const userAuthProvider = await UserProviderRepository.update({ user: { id: userResetPassword.userId }, password })
    if (!userAuthProvider) return null

    return UserResetPasswordRepository.update({ uuid: userResetPassword.uuid }, t)
  })
}
