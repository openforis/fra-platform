import { createI18nPromise } from 'i18n/i18nFactory'

import { CountryIso } from 'meta/area'
import { AssessmentName, Assessments } from 'meta/assessment'
import { Routes } from 'meta/routes'
import { RoleName, User, UserRole, Users } from 'meta/user'

import { sendMail } from './mail'

export const userInvite = async (props: {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: string
  role: UserRole<RoleName>
  url: string
  userToInvite: User
}) => {
  const { assessmentName, countryIso, cycleName, role, url, userToInvite } = props

  const i18n = await createI18nPromise('en')

  const link = `${url}${Routes.LoginInvitation.generatePath(
    { assessmentName, cycleName },
    { invitationUuid: role.invitationUuid }
  )}`

  const roleName = i18n.t(Users.getI18nRoleLabelKey(role.role))

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
