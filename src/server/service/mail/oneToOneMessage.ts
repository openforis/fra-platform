import { createI18nPromise } from 'i18n/i18nFactory'

import { ClientRoutes } from 'meta/app'
import { CountryIso } from 'meta/area'
import { AssessmentName, Assessments } from 'meta/assessment'
import { User, Users } from 'meta/user'

import { sendMail } from './mail'

export const oneToOneMessage = async (props: {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: string
  recipient: User
  sender: User
  url: string
}) => {
  const { assessmentName, countryIso, cycleName, recipient, sender, url } = props

  const i18n = await createI18nPromise('en')

  const link = `${url}${ClientRoutes.Assessment.Cycle.Country.Home.Root.getLink({
    assessmentName,
    countryIso,
    cycleName,
  })}`

  const emailProps = {
    assessmentName: i18n.t(Assessments.getShortLabel(assessmentName)),
    country: i18n.t(`area.${countryIso}.listName`),
    cycleName,
    sender: Users.getFullName(sender),
    recipient: Users.getFullName(recipient),
    link,
    url,
  }

  const oneToOneMessageEmail = {
    to: recipient.email,
    subject: i18n.t('userChat.notificationEmail.subject', emailProps),
    text: i18n.t('userChat.notificationEmail.textMessage', emailProps),
    html: i18n.t('userChat.notificationEmail.htmlMessage', emailProps),
  }

  await sendMail(oneToOneMessageEmail)
}
