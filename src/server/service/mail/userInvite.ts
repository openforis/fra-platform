import { createI18nPromise } from '@i18n/i18nFactory'

import { CountryIso } from '@meta/area'
import { RoleName, User, UserRole, Users } from '@meta/user'

import { BasePaths } from '@client/basePaths'

import { sendMail } from './mail'

export const userInvite = async (props: {
  countryIso: CountryIso
  role: UserRole<RoleName>
  userToInvite: User
  user: User
  url: string
}) => {
  const { countryIso, role, userToInvite, user, url } = props

  const i18n = await createI18nPromise('en')

  const link = `${url}${BasePaths.Login.invitation()}${
    role.invitationUuid ? `?invitationUuid=${role.invitationUuid}` : ''
  }`

  const countryName = i18n.t(`area.${countryIso}.listName`)

  const roleName = i18n.t(Users.getI18nRoleLabelKey(role.role))

  const emailProps = {
    country: countryName,
    invitedUser: userToInvite.name,
    role: roleName,
    loggedInUser: user.name,
    link,
    url,
  }

  const invitationEmail = {
    to: userToInvite.email,
    subject: i18n.t('userManagement.invitationEmail.subject', { country: countryName }),
    text: i18n.t('userManagement.invitationEmail.textMessage', emailProps),
    html: i18n.t('userManagement.invitationEmail.htmlMessage', emailProps),
  }

  await sendMail(invitationEmail)
}
