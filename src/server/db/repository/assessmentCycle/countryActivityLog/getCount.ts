import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TablePaginatedCount } from 'meta/tablePaginated/count'

import { BaseProtocol, DB } from 'server/db/db'
import { getMaterializedViewName } from 'server/db/repository/assessmentCycle/countryActivityLog/_common/getMaterializedViewName'
import { whereClause } from 'server/db/repository/assessmentCycle/countryActivityLog/_common/select'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export const getCount = async (props: Props, client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
  const { assessment, countryIso, cycle } = props

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const schemaCycle = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })
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
