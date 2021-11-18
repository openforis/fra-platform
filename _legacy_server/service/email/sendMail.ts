import * as nodemailer from 'nodemailer'

import * as R from 'ramda'
import * as assert from 'assert'

const mailTransport = nodemailer.createTransport({
  host: process.env.FRA_MAIL_HOST,
  port: Number(process.env.FRA_MAIL_PORT),
  secure: process.env.FRA_MAIL_SECURE === 'true',
  auth: {
    user: process.env.FRA_MAIL_USER,
    pass: process.env.FRA_MAIL_PASSWORD,
  },
})

const emailDefaults = {
  from: '"FRA Platform" <fra@fao.org>',
}
export const sendMail = async (email: any) => {
  const mailToSend = { ...emailDefaults, ...email }
  const requiredKeys = ['from', 'to', 'subject', 'text', 'html']
  const mailToSendKeys = Object.keys(mailToSend)
  assert(
    // @ts-ignore
    R.all((key: any) => R.contains(key, requiredKeys), mailToSendKeys),
    `One or more of the fields in email is missing: ${R.difference(requiredKeys, mailToSendKeys)}`
  )
  await mailTransport.sendMail(mailToSend)
}
