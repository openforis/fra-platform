import * as nodemailer from 'nodemailer'

import { ProcessEnv } from '@server/utils'

import { assessmentNotifyUsers } from './assessmentNotifyUsers'
import { resetPassword } from './resetPassword'
import { userInvite } from './userInvite'

const mailTransport = nodemailer.createTransport({
  host: ProcessEnv.mail.host,
  port: ProcessEnv.mail.port,
  secure: ProcessEnv.mail.secure,
  auth: {
    user: ProcessEnv.mail.auth.user,
    pass: ProcessEnv.mail.auth.pass,
  },
})

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

export const sendMail = async (email: MailServiceEmail) => {
  if (ProcessEnv.nodeEnv !== 'test') {
    await mailTransport.sendMail({ ...emailDefaults, ...email })
  }
}

export const MailService = {
  sendMail,
  resetPassword,
  userInvite,
  assessmentNotifyUsers,
}
