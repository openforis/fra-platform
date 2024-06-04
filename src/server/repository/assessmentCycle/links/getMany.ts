import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { Link } from 'meta/cycleData'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  approved?: boolean
  assessment: Assessment
  cycle: Cycle
  excludeDeleted?: boolean
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

const _getOrderClause = (
  orderBy: string | undefined,
  orderByDirection: TablePaginatedOrderByDirection | undefined
): string => {
  if (Objects.isEmpty(orderBy)) return 'order by id asc'

  const direction = orderByDirection ?? TablePaginatedOrderByDirection.asc
  if (orderBy === 'code') {
    return `order by (visits -> jsonb_array_length(visits) - 1 ->> 'code') ${direction}`
  }
  return `order by ${orderBy} ${direction}`
}

export const getMany = (props: Props, client: BaseProtocol = DB): Promise<Array<Link>> => {
  const {
    approved,
    assessment,
    cycle,
    excludeDeleted,
    limit: limitProp,
    offset: offsetProp,
    orderBy,
    orderByDirection,
  } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  let where = ''
  if (!Objects.isEmpty(approved)) {
    where = `where jsonb_exists(props, 'approved') AND (props ->> 'approved')::boolean = $1`
  }
  if (excludeDeleted) {
    if (where.length > 0) {
      where += " and (props->>'deleted')::boolean is distinct from true"
    } else {
      where = "where (props->>'deleted')::boolean is distinct from true"
    }
  }
  const limit = !Objects.isEmpty(limitProp) ? 'limit $2' : ''
  const offset = !Objects.isEmpty(offsetProp) ? 'offset $3' : ''
  const order = _getOrderClause(orderBy, orderByDirection)

  return client.map<Link>(
    `
        select *
        from ${schemaCycle}.link
        ${where}
        ${order}
        ${limit}
        ${offset}
     `,
    [approved, limitProp, offsetProp],
    (row) => Objects.camelize(row)
  )
}
