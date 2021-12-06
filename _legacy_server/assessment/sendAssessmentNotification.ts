import * as R from 'ramda'
import { assessmentStatus } from '@common/assessment'
import { getCountry } from '@server/repository/country/getCountry'
import { createI18nPromise } from '../../i18n/i18nFactory'
import { sendMail } from '../service/email/sendMail'
import { fetchCountryUsers, fetchAdministrators } from '../repository/user/_legacy_userRepository'
import { nationalCorrespondent, reviewer } from '../../common/countryRole'

export const createMail = async (
  countryIso: any,
  assessment: any,
  user: any,
  loggedInUser: any,
  i18n: any,
  serverUrl: any
) => {
  const country = await getCountry(countryIso)
  const emailLocalizationParameters = {
    country: i18n.t(`area.${country.countryIso}.listName`),
    serverUrl,
    recipientName: user.name,
    status: i18n.t(`assessment.status.${assessment.status}.label`),
    changer: loggedInUser.name,
    assessment: i18n.t(`assessment.${assessment.type}`),
    message: assessment.message,
  }
  return {
    to: user.email,
    subject: i18n.t('assessment.statusChangeNotification.subject', emailLocalizationParameters),
    text: i18n.t('assessment.statusChangeNotification.textMessage', emailLocalizationParameters),
    html: i18n.t('assessment.statusChangeNotification.htmlMessage', emailLocalizationParameters),
  }
}

export const getCountryUsers = async (countryIso: any, roles: any) => {
  const countryUsers = await fetchCountryUsers(countryIso)
  // @ts-ignore
  return R.filter((user: any) => R.contains(user.role, roles), countryUsers)
}

export const getRecipients = async (countryIso: any, newStatus: any) => {
  switch (newStatus) {
    case assessmentStatus.editing:
      return await getCountryUsers(countryIso, [nationalCorrespondent.role])
    case assessmentStatus.review:
      return await getCountryUsers(countryIso, [reviewer.role])
    case assessmentStatus.approval:
      return await fetchAdministrators()
    case assessmentStatus.accepted:
      return await getCountryUsers(countryIso, [nationalCorrespondent.role, reviewer.role])
    default:
      return []
  }
}

export const sendAssessmentNotification = async (
  countryIso: any,
  assessment: any,
  loggedInUser: any,
  serverUrl: any
) => {
  const i18n = await createI18nPromise('en')
  const recipients = await getRecipients(countryIso, assessment.status)

  // Can't use forEach or map here, await doesn't work properly
  for (const user of recipients) {
    await sendMail(await createMail(countryIso, assessment, user, loggedInUser, i18n, serverUrl))
  }
}
