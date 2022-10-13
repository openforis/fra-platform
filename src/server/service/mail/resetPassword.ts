import { createI18nPromise } from '@i18n/i18nFactory'

import { User, UserResetPassword } from '@meta/user'

import { sendMail } from './mail'

export const resetPassword = async (props: { url: string; user: User; userResetPassword: UserResetPassword }) => {
  const { url, user, userResetPassword } = props

  const i18n = await createI18nPromise('en')

  const link = `${url}/login/resetPassword${
    userResetPassword.uuid ? `?resetPasswordUuid=${userResetPassword.uuid}` : ''
  }`

  const emailProps = { link, url }

  const resetPasswordEmail = {
    to: user.email,
    subject: i18n.t('user.resetPasswordEmail.subject'),
    text: i18n.t('user.resetPasswordEmail.textMessage', emailProps),
    html: i18n.t('user.resetPasswordEmail.htmlMessage', emailProps),
  }

  await sendMail(resetPasswordEmail)
}
