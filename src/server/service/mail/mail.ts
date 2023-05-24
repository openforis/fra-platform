// import * as nodemailer from 'nodemailer'

import { ProcessEnv } from '@server/utils'

import { assessmentNotifyUsers } from './assessmentNotifyUsers'
import { resetPassword } from './resetPassword'
import { userInvite } from './userInvite'

// const mailTransport = nodemailer.createTransport({
//   host: process.env.FRA_MAIL_HOST,
//   port: Number(process.env.FRA_MAIL_PORT),
//   secure: process.env.FRA_MAIL_SECURE === 'true',
//   auth: {
//     user: process.env.FRA_MAIL_USER,
//     pass: process.env.FRA_MAIL_PASSWORD,
//   },
// })

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emailDefaults = {
  from: '"FRA Platform" <fra@fao.org>',
}

export interface MailServiceEmail {
  from?: string
  to: string
  subject: string
  text: string
  html: string
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendMail = async (email: MailServiceEmail) => {
  if (ProcessEnv.nodeEnv !== 'test') {
    // await mailTransport.sendMail({ ...emailDefaults, ...email })
  }
}

export const MailService = {
  sendMail,
  resetPassword,
  userInvite,
  assessmentNotifyUsers,
}
