import { UserResetPassword } from 'meta/user/resetPassword'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { UserRepository } from 'server/db/repository/public/user'
import { UserResetPasswordRepository } from 'server/db/repository/public/userResetPassword'

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
