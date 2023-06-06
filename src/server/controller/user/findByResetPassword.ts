import { User, UserResetPassword } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserRepository } from 'server/repository/public/user'
import { UserResetPasswordRepository } from 'server/repository/public/userResetPassword'

export const findByResetPassword = async (
  props: { resetPasswordUuid: string },
  client: BaseProtocol = DB
): Promise<{
  user: User
  userResetPassword: UserResetPassword
}> => {
  const { resetPasswordUuid } = props

  const userResetPassword = await UserResetPasswordRepository.read({ uuid: resetPasswordUuid }, client)

  const user = userResetPassword ? await UserRepository.getOne({ id: userResetPassword.userId }, client) : null

  return {
    user,
    userResetPassword,
  }
}
