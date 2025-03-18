import { Objects } from 'utils/objects'

import { CountrySummary } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { fieldsJoined } from './fields'

type Props = {
  assessment: Assessment
  cycle: Cycle
  limit: string
  offset: string
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<CountrySummary>> => {
  const { assessment, cycle, limit, offset, orderBy, orderByDirection } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map(
    `
        select ${fieldsJoined('cs')}, c.status
        from ${schemaCycle}.country_summary cs
            left join ${schemaCycle}.country c using country_iso
        order by ${orderBy ?? 'country_iso'} ${orderByDirection ?? TablePaginatedOrderByDirection.asc} nulls last
        limit $1 offset $2
        ;
    `,
    [limit, offset],
    (rows) => Objects.camelize(rows)
  )
}
