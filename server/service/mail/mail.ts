import * as nodemailer from 'nodemailer'

import { userInvite } from './userInvite'

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

export interface MailServiceEmail {
  from?: string
  to: string
  subject: string
  text: string
  html: string
}

export const sendMail = async (email: MailServiceEmail) => {
  if (process.env.NODE_ENV !== 'tes') {
    await mailTransport.sendMail({ ...emailDefaults, ...email })
  }
}

export const MailService = {
  sendMail,
  userInvite,
}
