import { Objects } from 'utils/objects'

import { AreaCode } from 'meta/area/areaCode'
import { CountrySummary } from 'meta/area/countrySummary'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { getMaterializedViewName } from 'server/db/repository/assessmentCycle/countryActivityLog/_common/getMaterializedViewName'
import { whereClause } from 'server/db/repository/assessmentCycle/countryActivityLog/_common/select'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  limit: string
  offset: string
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<CountrySummary>> => {
  const { assessment, countryIso, cycle, limit, offset } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const viewName = getMaterializedViewName(countryIso)

  return client.map(
    `
        select *
        from ${schemaCycle}.${viewName}
        where ${whereClause}
        order by time desc
        limit $1 offset $2
    `,
    [limit, offset],
    (rows) => Objects.camelize(rows)
  )
}
