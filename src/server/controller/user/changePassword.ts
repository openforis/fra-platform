import { UserResetPassword } from 'meta/user/resetPassword'

import { BaseProtocol, DB } from 'server/db/db'
import { UserRepository } from 'server/db/repository/public/user'
import { UserProviderRepository } from 'server/db/repository/public/userProvider'
import { UserResetPasswordRepository } from 'server/db/repository/public/userResetPassword'

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

    const userAuthProvider = await UserProviderRepository.update({ userUuid: user.uuid, password })
    if (!userAuthProvider) return null

    return UserResetPasswordRepository.update({ uuid: userResetPassword.uuid }, t)
  })
}
