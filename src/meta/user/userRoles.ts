import i18n from 'i18next'
import { Dates } from 'utils/dates'

import { Areas } from 'meta/area/areas'
import { CountryStatus } from 'meta/area/countryStatus'
import { Assessment } from 'meta/assessment/assessment'
import { User } from 'meta/user/user'

import { CollaboratorEditPropertyType, CollaboratorPermissionsNEW, RoleName, UserRole } from './userRole'

const noRole = { role: 'NONE', labelKey: 'user.roles.noRole' }

// Return roles to receive email on country assessment status change
const getRecipientRoles = (props: { status: CountryStatus }): Array<RoleName> => {
  const { status } = props

  switch (status) {
    case CountryStatus.editing:
      return [
        RoleName.COLLABORATOR,
        RoleName.REVIEWER,
        RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
        RoleName.NATIONAL_CORRESPONDENT,
      ]
    case CountryStatus.review:
      return [RoleName.REVIEWER]
    case CountryStatus.approval:
      return [RoleName.ADMINISTRATOR, RoleName.REVIEWER]
    case CountryStatus.accepted:
      return [RoleName.REVIEWER, RoleName.NATIONAL_CORRESPONDENT]
    case CountryStatus.published:
      return [RoleName.ADMINISTRATOR, RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]
    default:
      return []
  }
}

const getLastRole = (params: { assessment?: Assessment; user: User }): UserRole => {
  const { assessment, user } = params

  if (!user || !user.roles) return undefined

  const roles = assessment ? user.roles.filter((role) => role.assessmentUuid === assessment?.uuid) : user.roles

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
  { countryIso: countryIsoA, role: roleA }: UserRole,
  { countryIso: countryIsoB, role: roleB }: UserRole
): number =>
  roleNamesOrder.indexOf(roleA) - roleNamesOrder.indexOf(roleB) ||
  (i18n.t(Areas.getTranslationKey(countryIsoA)) < i18n.t(Areas.getTranslationKey(countryIsoB)) ? -1 : 1)

const getDefaultCollaboratorPermissions = (): CollaboratorPermissionsNEW => {
  return { [CollaboratorEditPropertyType.descriptions]: ['all'], [CollaboratorEditPropertyType.tableData]: ['all'] }
}

export const UserRoles = {
  noRole,
  getRecipientRoles,
  getLastRole,
  sortRolesByRolesAndCountry,
  getDefaultCollaboratorPermissions,
}
