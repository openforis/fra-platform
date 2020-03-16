const {createI18nPromise} = require('./../../common/i18n/i18nFactory')
const {sendMail} = require('./../email/sendMail')

const createMail = (i18n, user, url, uuid) => {
  const link = url + '/login/resetPassword?k=' + uuid

  return {
    to: user.email,
    subject: i18n.t('user.resetPasswordEmail.subject'),
    text: i18n.t('user.resetPasswordEmail.textMessage', {user: user.name, link, url}),
    html: i18n.t('user.resetPasswordEmail.htmlMessage', {user: user.name, link, url})
  }
}

const sendResetPasswordEmail = async (user, url, uuid) => {
  const i18n = await createI18nPromise('en')
  const email = createMail(i18n, user, url, uuid)
  return await sendMail(email)
}

module.exports = {
  sendResetPasswordEmail
}
