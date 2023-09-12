import { Objects } from 'utils/objects'

import { TablePaginatedCount } from 'meta/tablePaginated'

import { BaseProtocol, DB } from 'server/db'

export const getCount = async (client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
  return client.one<TablePaginatedCount>(
    `
        select count(ur.id) as total from users_role ur
    `,
    [],
    (res) => Objects.camelize(res)
  )
}
