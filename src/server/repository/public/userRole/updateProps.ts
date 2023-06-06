import { Objects } from 'utils/objects'

import { RoleName, UserRole, UserRoleBaseProps, UserRoleExtendedProps } from 'meta/user/userRole'

import { BaseProtocol, DB } from 'server/db'

export const updateProps = async (
  props: {
    id: number
    props: UserRoleBaseProps | UserRoleExtendedProps
  },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName>> => {
  const { id, props: properties } = props

  return client.one<UserRole<RoleName>>(
    `
        update users_role
        set props = $1::jsonb
        where id = $2
        returning *;
    `,
    [JSON.stringify(properties), id],
    Objects.camelize
  )
}
