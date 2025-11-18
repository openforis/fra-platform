import { RoleName } from 'meta/user/role/name'
import { UserRoles } from 'meta/user/roles'

export const getI18nRoleLabelKey = (role: RoleName | string): string => {
  return role ? `user.roles.${role}` : UserRoles.noRole.labelKey
}
