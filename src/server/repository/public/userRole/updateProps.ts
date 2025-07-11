import { Objects } from 'utils/objects'

import { User } from 'meta/user/user'
import { RoleName, UserRole, UserRoleBaseProps, UserRoleExtendedProps } from 'meta/user/userRole'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  id: number
  role?: RoleName
  props?: UserRoleBaseProps | UserRoleExtendedProps
}

export const updateProps = async (props: Props, client: BaseProtocol = DB): Promise<UserRole<RoleName>> => {
  const { id, props: properties, role } = props

  const values: Record<string, string | Partial<User> | number | UserRoleBaseProps | UserRoleExtendedProps> = { id }
  const setParts: Array<string> = []

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
