import { createI18nPromise } from 'i18n/i18nFactory'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleName } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'
import { Routes } from 'meta/routes/routes'
import { SectionNames } from 'meta/routes/sectionNames'
import { RoleName, User, UserRole, Users } from 'meta/user'

import { ProcessEnv } from 'server/utils'

import { sendMail } from './mail'

export const userNotifyAcceptedInvitation = async (props: {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  invitedUser: User
  invitedUserRole: UserRole<RoleName>
  recipient: User
}): Promise<void> => {
  const { assessmentName, countryIso, cycleName, invitedUser, invitedUserRole, recipient } = props

  const url = ProcessEnv.appUri
  const i18n = await createI18nPromise(recipient.props.lang ?? Lang.en)

  const sectionName = SectionNames.Country.Home.collaborators
  const manageCollaboratorsUrl = `${url}${Routes.CountryHomeSection.generatePath({
    assessmentName,
    cycleName,
    countryIso,
    sectionName,
  })}`

  const roleName = i18n.t(Users.getI18nRoleLabelKey(invitedUserRole.role))

  const emailProps = {
    assessmentName: i18n.t(Assessments.getShortLabel(assessmentName)),
    country: i18n.t(`area.${countryIso}.listName`),
    cycleName,
    invitedUserName: invitedUser.props.name,
    invitedUserSurname: invitedUser.props.surname,
    manageCollaboratorsUrl,
    recipientName: recipient.props.name,
    recipientSurname: recipient.props.surname,
    role: roleName,
  }

  const acceptedInvitationEmail = {
    to: recipient.email,
    subject: i18n.t('email.invitationAccepted.subject', emailProps),
    text: i18n.t('email.invitationAccepted.textMessage', emailProps),
    html: i18n.t('email.invitationAccepted.htmlMessage', emailProps),
  }

  await sendMail(acceptedInvitationEmail)
}
