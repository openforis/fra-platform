const nodemailer = require('nodemailer')
const Promise = require('bluebird')

const {getCountryName} = require('../../common/country')
const {createI18nInstance} = require('../../common/i18n/i18nFactory')

const transporter = nodemailer.createTransport({
  host: process.env.FRA_MAIL_HOST,
  port: Number(process.env.FRA_MAIL_PORT),
  secure: process.env.FRA_MAIL_SECURE === 'true',
  auth: {
    user: process.env.FRA_MAIL_USER,
    pass: process.env.FRA_MAIL_PASSWORD
  }
})

const createMailOptions = (countryIso, user, url, i18n) => {

  const link = `${url}/login${user.invitationUuid ? `?i=${user.invitationUuid}` : ''}`
  const country = getCountryName(countryIso, 'en')
  const role = user.role.toLowerCase()

  return {
    from: '"FRA Platform" <fra@fao.org>',
    to: user.email,
    subject: i18n.t('userManagement.invitationEmail.subject', {country}),
    text: i18n.t('userManagement.invitationEmail.textMessage', {country, user: user.name, role: `$t(user.roles.${role})`, link}),
    html: i18n.t('userManagement.invitationEmail.htmlMessage', {country, user: user.name, role: `$t(user.roles.${role})`, link})
  }

}

const sendMail = (countryIso, user, url) => new Promise((resolve, reject) => {
  createI18nInstance(
    'en',
    i18n => {

      const mailOptions = createMailOptions(countryIso, user, url, i18n)

      transporter.sendMail(mailOptions, (error, info) => {
        if (error)
          reject(error)

        resolve(info)
      })
    })

})

module.exports.sendMail = sendMail
