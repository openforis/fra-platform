import { BaseProtocol, DB } from '@server/db'
import { User, UserResetPassword } from '@meta/user'
import { UserResetPasswordRepository } from '@server/repository'
import { MailService } from '@server/service'

export const createResetPassword = async (
  props: {
    user: User
    url: string // application url
  },
  client: BaseProtocol = DB
): Promise<UserResetPassword | null> => {
  const { user, url } = props

  return client.tx(async (t) => {
    const lastUserResetPassword = await UserResetPasswordRepository.getLastByUser({ user })
    if (
      lastUserResetPassword &&
      lastUserResetPassword.active &&
      Date.now() - Date.parse(lastUserResetPassword.createdAt) < 300000
    )
      return lastUserResetPassword
    const userResetPassword = await UserResetPasswordRepository.create({ user }, t)

    await MailService.resetPassword({ url, user, userResetPassword })

    return userResetPassword
  })
}
