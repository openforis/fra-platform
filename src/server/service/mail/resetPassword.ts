import { createI18nPromise } from 'i18n/i18nFactory'

import { AssessmentName } from 'meta/assessment'
import { Routes } from 'meta/routes'
import { User, UserResetPassword, Users } from 'meta/user'

import { sendMail } from './mail'

export const resetPassword = async (props: {
  assessmentName: AssessmentName
  cycleName: string
  url: string
  user: User
  userResetPassword: UserResetPassword
}) => {
  const { assessmentName, cycleName, url, user, userResetPassword } = props

  const i18n = await createI18nPromise('en')

  const link = `${url}${Routes.LoginResetPassword.generatePath(
    { assessmentName, cycleName },
    { resetPasswordUuid: userResetPassword?.uuid }
  )}`

  const emailProps = { link, url, user: Users.getFullName(user) }

  const resetPasswordEmail = {
    to: user.email,
    subject: i18n.t('user.resetPasswordEmail.subject'),
    text: i18n.t('user.resetPasswordEmail.textMessage', emailProps),
    html: i18n.t('user.resetPasswordEmail.htmlMessage', emailProps),
  }

  await sendMail(resetPasswordEmail)
}
