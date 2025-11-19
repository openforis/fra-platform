import { Objects } from 'utils/objects'

import { CollaboratorPermissions } from 'meta/user/role/collaborator'
import { RoleName } from 'meta/user/role/name'
import { UserRoleBaseProps, UserRoleExtendedProps } from 'meta/user/role/props'
import { UserRole } from 'meta/user/role/role'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  id: number
  permissions?: CollaboratorPermissions
  role?: RoleName
  props?: UserRoleBaseProps | UserRoleExtendedProps
}

export const updateProps = async (props: Props, client: BaseProtocol = DB): Promise<UserRole<RoleName>> => {
  const { id, permissions, props: properties, role } = props

  const values: Record<
    string,
    string | Partial<User> | number | UserRoleBaseProps | UserRoleExtendedProps | CollaboratorPermissions
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
