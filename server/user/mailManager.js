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

const createMailOptions = (countryIso, invitedUser, loggedInUser, url, i18n) => {

  const link = `${url}/login${invitedUser.invitationUuid ? `?i=${invitedUser.invitationUuid}` : ''}`
  const country = getCountryName(countryIso, 'en')
  const role = invitedUser.role.toLowerCase()

  console.log(countryIso, invitedUser, loggedInUser, url, link)

  return {
    from: '"FRA Platform" <fra@fao.org>',
    to: invitedUser.email,
    subject: i18n.t('userManagement.invitationEmail.subject', {country}),
    text: i18n.t('userManagement.invitationEmail.textMessage', {country, invitedUser: invitedUser.name, role: `$t(user.roles.${role})`, loggedInUser: loggedInUser.name, link, url}),
    html: i18n.t('userManagement.invitationEmail.htmlMessage', {country, invitedUser: invitedUser.name, role: `$t(user.roles.${role})`, loggedInUser: loggedInUser.name, link, url})
  }
}

const sendMail = (countryIso, invitedUser, loggedInUser, url) => new Promise((resolve, reject) => {
  createI18nInstance(
    'en',
    i18n => {

      const mailOptions = createMailOptions(countryIso, invitedUser, loggedInUser, url, i18n)

      transporter.sendMail(mailOptions, (error, info) => {
        if (error)
          reject(error)

        resolve(info)
      })
    })
})

module.exports.sendMail = sendMail
