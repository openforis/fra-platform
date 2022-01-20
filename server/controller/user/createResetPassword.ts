import { BaseProtocol, DB } from '@server/db'
import { User, UserResetPassword } from '@meta/user'
import { UserResetPasswordRepository } from '@server/repository'

export const createResetPassword = async (
  props: {
    user: User
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword> => {
  const { user } = props

  return client.tx(async (t) => {
    return UserResetPasswordRepository.create({ user }, t)
  })
}
