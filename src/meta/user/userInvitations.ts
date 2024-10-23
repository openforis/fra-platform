import { UserInvitation } from 'meta/user/userInvitation'

export const isExpired = (invitation: UserInvitation, expiryPeriod?: number) =>
  new Date().getTime() - Date.parse(invitation.invitedAt) > (expiryPeriod || 7) * 86400000

export const UserInvitations = {
  isExpired,
}
