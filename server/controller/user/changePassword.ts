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
    const userResetRepository = await UserResetPasswordRepository.getLastByUser({ user })
    if (userResetRepository.uuid !== resetPasswordUuid) return null
    const userAuthProvider = await UserProviderRepository.update({ user, password })
    if (!userAuthProvider || userAuthProvider.props.password !== password) return null
    return UserResetPasswordRepository.update({ uuid: userResetRepository.uuid }, t)
  })
}
