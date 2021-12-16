import { CountryIso } from '@meta/area'
import { createI18nPromise } from '@i18n/i18nFactory'
import { User, UserRole } from '@meta/user'
import { sendMail } from './mail'

export const userInvite = async (props: {
  countryIso: CountryIso
  role: UserRole<any>
  userToInvite: User
  user: User
  url: string
}) => {
  const { countryIso, role, userToInvite, user, url } = props

  const i18n = await createI18nPromise('en')

  const link = `${url}/login${role.invitationUuid ? `?i=${role.invitationUuid}` : ''}`

  const countryName = i18n.t(`area.${countryIso}.listName`)

  const invitationEmail = {
    to: userToInvite.email,
    subject: i18n.t('userManagement.invitationEmail.subject', { country: countryName }),
    text: i18n.t('userManagement.invitationEmail.textMessage', {
      country: countryName,
      invitedUser: userToInvite.name,
      role: `$t(${role.name})`,
      loggedInUser: user.name,
      link,
      url,
    }),
    html: i18n.t('userManagement.invitationEmail.htmlMessage', {
      country: countryName,
      invitedUser: userToInvite.name,
      role: `$t(${role.name})`,
      loggedInUser: user.name,
      link,
      url,
    }),
  }
  await sendMail(invitationEmail)
}
