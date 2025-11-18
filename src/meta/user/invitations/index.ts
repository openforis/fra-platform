import { UserInvitation } from 'meta/user/invitation'

export const invitationDefaultExpiryPeriodDays = 7

export const isExpired = (invitation: UserInvitation, expiryPeriod?: number): boolean =>
  new Date().getTime() - Date.parse(invitation.invitedAt) >
  (expiryPeriod || invitationDefaultExpiryPeriodDays) * 86400000

export const UserInvitations = {
  isExpired,
}
