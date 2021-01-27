import { createI18nPromise } from '../../common/i18n/i18nFactory'
import { sendMail } from '../email/sendMail'

export const createMail = (i18n: any, user: any, url: any, uuid: any) => {
  const link = `${url}/login/resetPassword?k=${uuid}`

  return {
    to: user.email,
    subject: i18n.t('user.resetPasswordEmail.subject'),
    text: i18n.t('user.resetPasswordEmail.textMessage', { user: user.name, link, url }),
    html: i18n.t('user.resetPasswordEmail.htmlMessage', { user: user.name, link, url }),
  }
}

export const sendResetPasswordEmail = async (user: any, url: any, uuid: any) => {
  const i18n = await createI18nPromise('en')
  const email = createMail(i18n, user, url, uuid)
  return await sendMail(email)
}

export default {
  sendResetPasswordEmail,
}
