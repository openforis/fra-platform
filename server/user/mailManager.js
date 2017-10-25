const nodemailer = require('nodemailer')
const Promise = require('bluebird')

const transporter = nodemailer.createTransport({
  host: process.env.FRA_MAIL_HOST,
  port: Number(process.env.FRA_MAIL_PORT),
  secure: process.env.FRA_MAIL_SECURE === 'true',
  auth: {
    user: process.env.FRA_MAIL_USER,
    pass: process.env.FRA_MAIL_PASSWORD
  }
})

const createMailOptions = (countryIso, user, url, invitationUUID) => {
  const textNewLine = `%0D%0A`
  const htmlNewLine = `<br/>`
  const link = `${url}${invitationUUID ? `i=${invitationUUID}` : ''}`

  const mailOptions = {
    from: '"FRA Platform" <fra@fao.org>',
    to: user.email,
    subject: `FRA Platform - Access granted to ${countryIso}`,

    text: `Dear ${user.name},
${textNewLine}${textNewLine}
You have been granted access to ${countryIso} as ${user.role}
${textNewLine}${textNewLine}
To access the platform, please follow the link ${link}
${textNewLine}${textNewLine}
Thank you,
${textNewLine}
The FRA team
    `,

    html: `Dear ${user.name},
${htmlNewLine}${htmlNewLine}
You have been granted access to ${countryIso} as ${user.role}
${htmlNewLine}${htmlNewLine}
To access the platform, please follow the link <a href="${link}">${link}</a>
${htmlNewLine}${htmlNewLine}
Thank you,
${htmlNewLine}
The FRA team
    `
  }

  return mailOptions
}

const sendMail = (countryIso, user, url, invitationUUID) => new Promise((resolve, reject) => {
  const mailOptions = createMailOptions(countryIso, user, url, invitationUUID)

  transporter.sendMail(mailOptions, (error, info) => {
    if (error)
      reject(error)

    resolve(info)
  })

})

module.exports.sendMail = sendMail
