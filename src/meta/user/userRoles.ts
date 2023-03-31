import { AssessmentStatus } from '@meta/area/country'
import { User } from '@meta/user/user'

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

const getLastRole = (user: User) => {
  if (!user || !user.roles) return undefined

  const { roles } = user
  if (roles.length === 1) return roles[0]

  const _roles = [...roles].sort((roleA, roleB) => {
    if (!roleA.acceptedAt && !roleB.acceptedAt) return 0
    if (!roleA.acceptedAt) return 1
    if (!roleB.acceptedAt) return -1
    return roleB.acceptedAt.localeCompare(roleA.acceptedAt)
  })

  return _roles[0]
}

const roleNamesOrder = [
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.REVIEWER,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

const sortRoles = ({ role: roleA }: UserRole<RoleName>, { role: roleB }: UserRole<RoleName>) =>
  roleNamesOrder.indexOf(roleA) - roleNamesOrder.indexOf(roleB)

export const UserRoles = {
  isInvitationExpired,
  noRole,
  getRecipientRoles,
  getLastRole,
  sortRoles,
}
