// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createI18n... Remove this comment to see the full error message
const { createI18nPromise } = require('../../common/i18n/i18nFactory')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendMail'.
const { sendMail } = require('../email/sendMail')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createMail... Remove this comment to see the full error message
const createMail = (i18n: any, user: any, url: any, uuid: any) => {
  const link = `${url}/login/resetPassword?k=${uuid}`

  return {
    to: user.email,
    subject: i18n.t('user.resetPasswordEmail.subject'),
    text: i18n.t('user.resetPasswordEmail.textMessage', { user: user.name, link, url }),
    html: i18n.t('user.resetPasswordEmail.htmlMessage', { user: user.name, link, url }),
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendResetP... Remove this comment to see the full error message
const sendResetPasswordEmail = async (user: any, url: any, uuid: any) => {
  const i18n = await createI18nPromise('en')
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 6 arguments, but got 4.
  const email = createMail(i18n, user, url, uuid)
  return await sendMail(email)
}

module.exports = {
  sendResetPasswordEmail,
}
