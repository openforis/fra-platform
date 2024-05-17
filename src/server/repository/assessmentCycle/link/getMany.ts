import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { Link } from 'meta/cycleData/link'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  approved?: boolean
  assessment: Assessment
  cycle: Cycle
  limit?: number
  offset?: number
}

export const getMany = (props: Props, client: BaseProtocol = DB): Promise<Array<Link>> => {
  const { approved, assessment, cycle, limit: limitProp, offset: offsetProp } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  let where = ''
  if (!Objects.isEmpty(approved)) {
    where = `where jsonb_exists(props, 'approved') AND (props ->> 'approved')::boolean = $1`
  }
  const limit = !Objects.isEmpty(limitProp) ? 'limit $2' : ''
  const offset = !Objects.isEmpty(offsetProp) ? 'offset $3' : ''

  return client.map<Link>(
    `
        select *
        from ${schemaCycle}.link
        ${where}
        ${limit}
        ${offset}
     `,
    [approved, limit, offset],
    (row) => Objects.camelize(row)
  )
}
