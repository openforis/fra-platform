import { Objects } from 'utils/objects'

import { AreaCode, CountryAdmin } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getMaterializedViewName } from './_common/getMaterializedViewName'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  limit: string
  offset: string
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<CountryAdmin>> => {
  const { assessment, cycle, countryIso, limit, offset } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const viewName = getMaterializedViewName(countryIso)

  return client.map(
    `
        select *
        from ${schemaCycle}.${viewName}
        order by time desc
        limit $1 offset $2
    `,
    [limit, offset],
    (rows) => Objects.camelize(rows)
  )
}
