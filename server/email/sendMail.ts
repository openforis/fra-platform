const nodemailer = require('nodemailer')
const Promise = require('bluebird')
const R = require('ramda')
const assert = require('assert')

const mailTransport = Promise.promisifyAll(
  nodemailer.createTransport({
    host: process.env.FRA_MAIL_HOST,
    port: Number(process.env.FRA_MAIL_PORT),
    secure: process.env.FRA_MAIL_SECURE === 'true',
    auth: {
      user: process.env.FRA_MAIL_USER,
      pass: process.env.FRA_MAIL_PASSWORD
    }
  })
)

const emailDefaults = {
  from: '"FRA Platform" <fra@fao.org>'
}

const sendMail = async email => {
  const mailToSend = R.merge(emailDefaults, email)
  const requiredKeys= ['from', 'to', 'subject', 'text', 'html']
  const mailToSendKeys = R.keys(mailToSend)
  assert(
    R.all(key => R.contains(key, requiredKeys), mailToSendKeys),
    `One or more of the fields in email is missing: ${R.difference(requiredKeys, mailToSendKeys)}`
  )
  await mailTransport.sendMailAsync(mailToSend)
}

module.exports.sendMail = sendMail
