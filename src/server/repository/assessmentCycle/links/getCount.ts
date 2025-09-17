import { Objects } from 'utils/objects'

import { TablePaginatedCount } from 'meta/tablePaginated'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { LinksGetManyProps } from 'server/repository/assessmentCycle/links/linksGetManyProps'
import { getPropsToQueryParams } from 'server/repository/assessmentCycle/links/utils/getPropsToQueryParams'

export const getCount = async (props: LinksGetManyProps, client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
  const { queryParams, whereConditions } = getPropsToQueryParams(props)

  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one(
    `
        select count(l.id) as total
        from ${schemaCycle}.link l
        where ${whereConditions.join(' and ')}
    `,
    queryParams,
    (res) => Objects.camelize(res)
  )
}
