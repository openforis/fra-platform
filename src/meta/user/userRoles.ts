import { RoleName, UserRole } from './userRole'

export const isInvitationExpired = (userRole: UserRole<RoleName>, expiryPeriod: number) =>
  new Date().getTime() - Date.parse(userRole.invitedAt) > expiryPeriod * 86400000

const noRole = { role: 'NONE', labelKey: 'user.roles.noRole' }

export const UserRoles = {
  isInvitationExpired,
  noRole,
}
