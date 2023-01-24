import { AssessmentStatus } from '@meta/area/country'

import { RoleName, UserRole } from './userRole'

export const isInvitationExpired = (userRole: UserRole<RoleName>, expiryPeriod?: number) =>
  new Date().getTime() - Date.parse(userRole.invitedAt) > (expiryPeriod || 7) * 86400000

const noRole = { role: 'NONE', labelKey: 'user.roles.noRole' }

// Return roles to receive email on country assessment status change
const getRecipientRoles = (props: { status: AssessmentStatus }) => {
  const { status } = props

  switch (status) {
    case AssessmentStatus.editing:
      return [RoleName.NATIONAL_CORRESPONDENT]
    case AssessmentStatus.review:
      return [RoleName.REVIEWER]
    case AssessmentStatus.approval:
      return [RoleName.ADMINISTRATOR]
    case AssessmentStatus.accepted:
      return [RoleName.REVIEWER, RoleName.NATIONAL_CORRESPONDENT]
    default:
      return []
  }
}

export const UserRoles = {
  isInvitationExpired,
  noRole,
  getRecipientRoles,
}
