import { AreaCode } from 'meta/area/areaCode'
import { CountrySummary } from 'meta/area/countrySummary'
import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { getMaterializedViewName } from 'server/db/repository/assessmentCycle/countryActivityLog/_common/getMaterializedViewName'
import { whereClause } from 'server/db/repository/assessmentCycle/countryActivityLog/_common/select'
import { activitiesLastEditOdpData } from 'server/db/repository/assessmentCycle/countrySummary/_lastEditActivities'
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

  const hasNationalDataPoints = [AssessmentNames.fra, AssessmentNames.fraTest].includes(
    assessment.props.name as AssessmentNames
  )

  // Null when the national data point has been deleted
  const nationalDataPointYear = hasNationalDataPoints ? `ndp.year` : `null`
  const nationalDataPointJoin = hasNationalDataPoints
    ? `left join ${schemaCycle}.original_data_point ndp
         on a.message in (${activitiesLastEditOdpData})
        and ndp.id = (a.target ->> 'id')::bigint`
    : ''

  return client.map(
    `
        select a.*,
               ${nationalDataPointYear} as national_data_point_year
        from ${schemaCycle}.${viewName} a
        ${nationalDataPointJoin}
        where ${whereClause}
        order by a.time desc
        limit $1 offset $2
    `,
    [limit, offset],
    (rows) => Objects.camelize(rows)
  )
}
