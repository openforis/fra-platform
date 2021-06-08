import { getCountry } from '../repository/country/countryRepository'
import { createI18nPromise } from '../../common/i18n/i18nFactory'
import { sendMail } from '../service/email/sendMail'
import { getRoleLabelKey } from '../../common/countryRole'

export const loginUrl = (user: any, url: any) => `${url}/login${user.invitationUuid ? `?i=${user.invitationUuid}` : ''}`

const createMail = async (countryIso: any, invitedUser: any, loggedInUser: any, url: any, i18n: any) => {
  const link = loginUrl(invitedUser, url)
  const dbCountry = await getCountry(countryIso)
  const countryName = i18n.t(`area.${dbCountry.countryIso}.listName`)

  const role = getRoleLabelKey(invitedUser.role)
  return {
    to: invitedUser.email,
    subject: i18n.t('userManagement.invitationEmail.subject', { country: countryName }),
    text: i18n.t('userManagement.invitationEmail.textMessage', {
      country: countryName,
      invitedUser: invitedUser.name,
      role: `$t(${role})`,
      loggedInUser: loggedInUser.name,
      link,
      url,
    }),
    html: i18n.t('userManagement.invitationEmail.htmlMessage', {
      country: countryName,
      invitedUser: invitedUser.name,
      role: `$t(${role})`,
      loggedInUser: loggedInUser.name,
      link,
      url,
    }),
  }
}

export const sendInvitation = async (countryIso: any, invitedUser: any, loggedInUser: any, url: any) => {
  const i18n = await createI18nPromise('en')
  const invitationEmail = await createMail(countryIso, invitedUser, loggedInUser, url, i18n)
  await sendMail(invitationEmail)
}
