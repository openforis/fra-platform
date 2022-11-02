import { RoleName } from './userRole'

const noRole = { role: 'NONE', labelKey: 'user.roles.noRole' }

const roles = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

export const UserRoles = {
  noRole,
  roles,
}
