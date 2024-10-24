import i18n from 'i18next'
import { Dates } from 'utils/dates'

import { Areas, AssessmentStatus } from 'meta/area'
import { Assessment } from 'meta/assessment'
import { User } from 'meta/user/user'

import { RoleName, UserRole } from './userRole'

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
      return [RoleName.ADMINISTRATOR, RoleName.REVIEWER]
    case AssessmentStatus.accepted:
      return [RoleName.REVIEWER, RoleName.NATIONAL_CORRESPONDENT]
    default:
      return []
  }
}

const getLastRole = (params: { assessment?: Assessment; user: User }) => {
  const { assessment, user } = params

  if (!user || !user.roles) return undefined

  const roles = assessment
    ? user.roles.filter((role) => Number(role.assessmentUuid) === Number(assessment?.uuid))
    : user.roles

  if (roles.length === 1) return roles[0]

  const _roles = [...roles].sort((roleA, roleB) => {
    if (!roleA.createdAt && !roleB.createdAt) return 0
    if (!roleA.createdAt) return 1
    if (!roleB.createdAt) return -1

    const dateA = Dates.parseISO(roleA.createdAt)
    const dateB = Dates.parseISO(roleB.createdAt)
    return Dates.isBefore(dateB, dateA) ? -1 : 1
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
  noRole,
  getRecipientRoles,
  getLastRole,
  sortRolesByRolesAndCountry,
}
