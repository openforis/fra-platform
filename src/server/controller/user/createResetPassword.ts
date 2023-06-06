import { AssessmentName } from 'meta/assessment'
import { User, UserResetPassword } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserResetPasswordRepository } from 'server/repository/public/userResetPassword'
import { MailService } from 'server/service'

export const createResetPassword = async (
  props: { assessmentName: AssessmentName; cycleName: string; user: User },
  client: BaseProtocol = DB
): Promise<UserResetPassword | null> => {
  const { assessmentName, cycleName, user } = props

  return client.tx(async (t) => {
    const lastUserResetPassword = await UserResetPasswordRepository.getLastByUser({ user })
    if (lastUserResetPassword && lastUserResetPassword.active && Date.now() - Date.parse(lastUserResetPassword.createdAt) < 300000)
      return lastUserResetPassword
    const userResetPassword = await UserResetPasswordRepository.create({ user }, t)

    await MailService.resetPassword({ assessmentName, cycleName, url: process.env.APP_URI, user, userResetPassword })

    return userResetPassword
  })
}
