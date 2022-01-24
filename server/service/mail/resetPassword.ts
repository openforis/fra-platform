import { createI18nPromise } from '@i18n/i18nFactory'
import { User, UserResetPassword } from '@meta/user'
import { sendMail } from './mail'

export const resetPassword = async (props: { url: string; user: User; userResetPassword: UserResetPassword }) => {
  const { url, user, userResetPassword } = props

  const i18n = await createI18nPromise('en')

  const link = `${url}/reset-password${userResetPassword.uuid ? `?uuid=${userResetPassword.uuid}` : ''}`

  const resetPasswordEmail = {
    to: user.email,
    subject: i18n.t('user.resetPasswordEmail.subject'),
    text: i18n.t('user.resetPasswordEmail.htmlMessage', {
      link,
      url,
    }),
    html: i18n.t('user.resetPasswordEmail.htmlMessage', {
      link,
      url,
    }),
  }
  await sendMail(resetPasswordEmail)
}
