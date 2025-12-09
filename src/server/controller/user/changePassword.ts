import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { UserResetPassword } from 'meta/user/resetPassword'

import { BaseProtocol, DB } from 'server/db/db'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { UserRepository } from 'server/db/repository/public/user'
import { UserProviderRepository } from 'server/db/repository/public/userProvider'
import { UserResetPasswordRepository } from 'server/db/repository/public/userResetPassword'

type Props = {
  email: string
  password: string
  resetPasswordUuid: string
}

type Returned = UserResetPassword | null

export const changePassword = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { email, password, resetPasswordUuid } = props

  return client.tx(async (t) => {
    const userResetPassword = await UserResetPasswordRepository.read({ uuid: resetPasswordUuid }, t)
    if (!userResetPassword) return null

    const user = await UserRepository.getOne({ id: userResetPassword.userId }, t)
    if (user.email !== email) return null

    const userAuthProvider = await UserProviderRepository.update({ userUuid: user.uuid, password }, t)
    if (!userAuthProvider) return null

    const updatedResetPassword = await UserResetPasswordRepository.update({ uuid: userResetPassword.uuid }, t)

    const target = { email, usersResetPasswordUuid: updatedResetPassword.uuid }
    const activityLog = { target, section: 'users', message: ActivityLogMessage.userPasswordChange, user }
    await ActivityLogRepository.insertActivityLog({ activityLog }, t)

    return updatedResetPassword
  })
}
