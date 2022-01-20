import { BaseProtocol, DB } from '@server/db'
import { User, UserResetPassword } from '@meta/user'
import { UserProviderRepository, UserResetPasswordRepository } from '@server/repository'

export const changePassword = async (
  props: {
    user: User
    password: string
    resetPasswordUuid: string
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword | null> => {
  const { user, password, resetPasswordUuid } = props

  return client.tx(async (t) => {
    const userResetPassword = await UserResetPasswordRepository.read({ uuid: resetPasswordUuid })
    if (!userResetPassword || userResetPassword.uuid !== resetPasswordUuid) return null
    const userAuthProvider = await UserProviderRepository.update({ user, password })
    if (!userAuthProvider || userAuthProvider.props.password !== password) return null
    return UserResetPasswordRepository.update({ uuid: userResetPassword.uuid }, t)
  })
}
