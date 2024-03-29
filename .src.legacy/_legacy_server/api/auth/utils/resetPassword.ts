import { User } from '@core/auth/user'
import { sendMail } from '@_legacy_server/controller/email/sendMail'
import { createI18nPromise } from '../../../../i18n/i18nFactory'

export const createMail = (i18n: any, user: User, url: string, uuid: string) => {
  const link = `${url}/login/resetPassword?k=${uuid}`

  return {
    to: user.email,
    subject: i18n.t('user.resetPasswordEmail.subject'),
    text: i18n.t('user.resetPasswordEmail.textMessage', { user: user.name, link, url }),
    html: i18n.t('user.resetPasswordEmail.htmlMessage', { user: user.name, link, url }),
  }
}

export const sendResetPasswordEmail = async (user: User, url: any, uuid: any) => {
  const i18n = await createI18nPromise('en')
  const email = createMail(i18n, user, url, uuid)
  return sendMail(email)
}

export default {
  sendResetPasswordEmail,
}
