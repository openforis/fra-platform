import i18n from 'i18next'
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'
import { AssessmentStatus } from 'meta/area/country'
import { Assessment } from 'meta/assessment'
import { User } from 'meta/user/user'

import { RoleName, UserRole } from './userRole'

export const isInvitationExpired = (userRole: UserRole<RoleName>, expiryPeriod?: number) =>
  new Date().getTime() - Date.parse(userRole.invitedAt) > (expiryPeriod || 7) * 86400000

export const isInvitationPending = (userRole: UserRole<RoleName>) =>
  !Objects.isEmpty(userRole.invitedAt) && Objects.isEmpty(userRole.acceptedAt)

const noRole = { role: 'NONE', labelKey: 'user.roles.noRole' }

// Return roles to receive email on country assessment status change
const getRecipientRoles = (props: { status: AssessmentStatus }) => {
  const { status } = props

  switch (status) {
    case AssessmentStatus.editing:
      return [
        RoleName.COLLABORATOR,
        RoleName.REVIEWER,
        RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
        RoleName.NATIONAL_CORRESPONDENT,
      ]
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

const getLastRole = (params: { assessment: Assessment; user: User }) => {
  const { assessment, user } = params

  if (!user || !user.roles) return undefined

  const roles = user.roles.filter((role) => Number(role.assessmentId) === Number(assessment?.id))
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

const sortRolesByRolesAndCountry = (
  { role: roleA, countryIso: countryIsoA }: UserRole<RoleName>,
  { role: roleB, countryIso: countryIsoB }: UserRole<RoleName>
) =>
  roleNamesOrder.indexOf(roleA) - roleNamesOrder.indexOf(roleB) ||
  (i18n.t(Areas.getTranslationKey(countryIsoA)) < i18n.t(Areas.getTranslationKey(countryIsoB)) ? -1 : 1)

export const UserRoles = {
  isInvitationExpired,
  isInvitationPending,
  noRole,
  getRecipientRoles,
  getLastRole,
  sortRolesByRolesAndCountry,
}
