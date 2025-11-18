import { createI18nPromise } from 'i18n/i18nFactory'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Lang } from 'meta/lang'
import { Routes } from 'meta/routes/routes'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { sendMail } from './mail'

export const oneToOneMessage = async (props: {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: string
  recipient: User
  sender: User
  url: string
}): Promise<void> => {
  const { assessmentName, countryIso, cycleName, recipient, sender, url } = props

  const i18n = await createI18nPromise(Lang.en)

  const link = `${url}${Routes.CountryHome.generatePath({
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
