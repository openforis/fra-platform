import { Objects } from 'utils/objects'

import { User } from 'meta/user/user'
import {
  CollaboratorPermissionsNEW,
  RoleName,
  UserRole,
  UserRoleBaseProps,
  UserRoleExtendedProps,
} from 'meta/user/userRole'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  id: number
  permissions?: CollaboratorPermissionsNEW
  role?: RoleName
  props?: UserRoleBaseProps | UserRoleExtendedProps
}

export const updateProps = async (props: Props, client: BaseProtocol = DB): Promise<UserRole<RoleName>> => {
  const { id, permissions, props: properties, role } = props

  const values: Record<
    string,
    string | Partial<User> | number | UserRoleBaseProps | UserRoleExtendedProps | CollaboratorPermissionsNEW
  > = { id }
  const setParts: Array<string> = []

  if (permissions) {
    values.permissions = permissions
    setParts.push('permissions = $(permissions)')
  }
  if (properties) {
    values.props = properties
    setParts.push('props = $(props)')
  }
  if (role) {
    values.role = role
    setParts.push('role = $(role)')
  }

  return client.one<UserRole<RoleName>>(
    `
      update users_role
      set ${setParts.join(', ')}
      where id = $(id) returning *
    `,
    values,
    Objects.camelize
  )
}
