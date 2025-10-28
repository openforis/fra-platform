import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TablePaginatedCount } from 'meta/tablePaginated'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

import { getMaterializedViewName } from './_common/getMaterializedViewName'
import { whereClause } from './_common/select'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export const getCount = async (props: Props, client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
  const { assessment, countryIso, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const viewName = getMaterializedViewName(countryIso)

  return client.one<TablePaginatedCount>(
    `
        select count(*) as total
        from ${schemaCycle}.${viewName}
        where ${whereClause}
    `,
    []
  )
}
