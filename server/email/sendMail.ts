const nodemailer = require('nodemailer')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assert')

const mailTransport = (Promise as any).promisifyAll(
  nodemailer.createTransport({
    host: process.env.FRA_MAIL_HOST,
    port: Number(process.env.FRA_MAIL_PORT),
    secure: process.env.FRA_MAIL_SECURE === 'true',
    auth: {
      user: process.env.FRA_MAIL_USER,
      pass: process.env.FRA_MAIL_PASSWORD,
    },
  })
)
const emailDefaults = {
  from: '"FRA Platform" <fra@fao.org>',
}
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendMail'.
const sendMail = async (email: any) => {
  const mailToSend = R.merge(emailDefaults, email)
  const requiredKeys = ['from', 'to', 'subject', 'text', 'html']
  const mailToSendKeys = R.keys(mailToSend)
  assert(
    R.all((key: any) => R.contains(key, requiredKeys), mailToSendKeys),
    `One or more of the fields in email is missing: ${R.difference(requiredKeys, mailToSendKeys)}`
  )
  await mailTransport.sendMailAsync(mailToSend)
}
module.exports.sendMail = sendMail
