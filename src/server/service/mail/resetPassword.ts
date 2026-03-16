import { AssessmentName } from 'meta/assessment/assessment'
import { Routes } from 'meta/routes/routes'
import { UserResetPassword } from 'meta/user/resetPassword'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { I18n } from 'server/utils/i18n'

import { sendMail } from './mail'

type Props = {
  assessmentName: AssessmentName
  cycleName: string
  url: string
  user: User
  userResetPassword: UserResetPassword
}

export const resetPassword = async (props: Props): Promise<void> => {
  const { assessmentName, cycleName, url, user, userResetPassword } = props

  const i18n = await I18n.getInstance({ user })

  const link = `${url}${Routes.LoginChangePassword.generatePath({
    assessmentName,
    cycleName,
    resetPasswordUuid: userResetPassword?.uuid,
  })}`

  const emailProps = { link, url, user: Users.getFullName(user) }

  const resetPasswordEmail = {
    to: user.email,
    subject: i18n.t('user.resetPasswordEmail.subject'),
    text: i18n.t('user.resetPasswordEmail.textMessage', emailProps),
    html: i18n.t('user.resetPasswordEmail.htmlMessage', emailProps),
  }

  await sendMail(resetPasswordEmail)
}
