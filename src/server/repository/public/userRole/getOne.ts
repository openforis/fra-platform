import { RoleName, UserRole } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { UserRoleAdapter } from 'server/repository/adapter/userRole'

type Props = {
  uuid: string
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<UserRole<RoleName> | null> => {
  const { uuid } = props

  const query = `
    select *
    from public.users_role
    where uuid = $1
  `

  return client.oneOrNone<UserRole<RoleName>>(query, [uuid], UserRoleAdapter)
}
