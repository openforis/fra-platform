import { RoleName, UserRole } from './userRole'

const expiryPeriod = 604800000

export const isInvitationExpired = (userRole: UserRole<RoleName>) =>
  new Date().getTime() - Date.parse(userRole.invitedAt) > expiryPeriod

const noRole = { role: 'NONE', labelKey: 'user.roles.noRole' }

export const UserRoles = {
  isInvitationExpired,
  noRole,
}
