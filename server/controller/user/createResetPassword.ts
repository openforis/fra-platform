import { BaseProtocol, DB } from '@server/db'
import { User, UserResetPassword } from '@meta/user'
import { UserResetPasswordRepository } from '@server/repository'

export const createResetPassword = async (
  props: {
    user: User
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword | null> => {
  const { user } = props

  return client.tx(async (t) => {
    const userResetPassword = await UserResetPasswordRepository.getLastByUser({ user })
    if (userResetPassword?.createdAt && Date.now() - Date.parse(userResetPassword.createdAt) < 300000) return null
    return UserResetPasswordRepository.create({ user }, t)
  })
}
