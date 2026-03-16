import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Routes } from 'meta/routes/routes'
import { UserInvitation } from 'meta/user/invitation'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { I18n, ProcessEnv } from 'server/utils'

import { sendMail } from './mail'

export const userInvite = async (props: {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: string
  userInvitation: UserInvitation
  userToInvite: User
}): Promise<void> => {
  const { assessmentName, countryIso, cycleName, userInvitation, userToInvite } = props

  const url = ProcessEnv.appUri
  const i18n = await I18n.getInstance({ user: userToInvite })

  const link = `${url}${Routes.LoginInvitation.generatePath(
    { assessmentName, cycleName, invitationUuid: userInvitation.uuid },
    { lang: userToInvite.props.lang }
  )}`

  const roleName = i18n.t(Users.getI18nRoleLabelKey(userInvitation.role))

  const emailProps = {
    country: i18n.t(`area.${countryIso}.listName`),
    assessmentName: i18n.t(Assessments.getShortLabel(assessmentName)),
    cycleName,
    invitedUser: Users.getFullName(userToInvite),
    role: roleName,
    link,
    url,
  }

  const invitationEmail = {
    to: userToInvite.email,
    subject: i18n.t('userManagement.invitationEmail.subject'),
    text: i18n.t('userManagement.invitationEmail.textMessage', emailProps),
    html: i18n.t('userManagement.invitationEmail.htmlMessage', emailProps),
  }

  await sendMail(invitationEmail)
}
