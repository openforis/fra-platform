import { Objects } from 'utils/objects'

import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { RoleAdmin } from 'meta/user/roleAdmin'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  limit: string
  offset: string
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<RoleAdmin>> => {
  const { limit, offset, orderBy, orderByDirection } = props

  return client.map<RoleAdmin>(
    `
        select ur.*,
               u.email
        from users_role ur
                 left join public.users u on ur.user_id = u.id
        order by ${orderBy ?? 'country_iso'} ${orderByDirection ?? TablePaginatedOrderByDirection.asc} nulls last
        limit $1 offset $2
    `,
    [limit, offset],
    (row) => Objects.camelize(row)
  )
}
