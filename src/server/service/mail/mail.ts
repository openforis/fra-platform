import * as nodemailer from 'nodemailer'

import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

import { assessmentNotifyUsers } from './assessmentNotifyUsers'
import { oneToOneMessage } from './oneToOneMessage'
import { resetPassword } from './resetPassword'
import { userInvite } from './userInvite'

const mailTransport = nodemailer.createTransport({
  pool: true,
  maxConnections: 1,
  host: process.env.FRA_MAIL_HOST,
  port: Number(process.env.FRA_MAIL_PORT),
  secure: process.env.FRA_MAIL_SECURE === 'true',
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false,
    requestCert: true,
  },
  auth: {
    user: process.env.FRA_MAIL_USER,
    pass: process.env.FRA_MAIL_PASSWORD,
  },
})

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emailDefaults = {
  from: '"FRA Platform" <fra-platform@fao.org>',
}

export interface MailServiceEmail {
  from?: string
  to: string
  subject: string
  text: string
  html: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendMail = async (email: MailServiceEmail) => {
  if (ProcessEnv.nodeEnv !== 'test' && ProcessEnv.fraMailEnabled) {
    await new Promise<void>((resolve, reject) => {
      mailTransport.sendMail({ ...emailDefaults, ...email }, (error: Error | any, _info) => {
        if (error) {
          // 501 and 550 are errors from the mail server: email address not found
          if (error.responseCode === 501 || error.responseCode === 550) {
            reject(new Error(error.response))
          } else {
            reject(error)
          }
        } else {
          resolve()
        }
      })
    })
  } else {
    Logger.debug('MailService.sendMail')
    Logger.debug(JSON.stringify({ email }, null, 2))
  }
}

export const MailService = {
  assessmentNotifyUsers,
  oneToOneMessage,
  resetPassword,
  sendMail,
  userInvite,
}
