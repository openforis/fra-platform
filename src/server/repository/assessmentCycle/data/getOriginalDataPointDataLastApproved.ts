import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment } from 'meta/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { RecordAssessmentData } from 'meta/data'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { NodeExtQueries } from 'server/repository/assessmentCycle/nodeExt/queries'
import { OriginalDataPointQueries } from 'server/repository/assessmentCycle/originalDataPoint/queries'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
}

const _getPrevCycleODPData = (props: Props): string => {
  const { assessment, countryISOs, cycle } = props
  const previousCycle = Cycles.getPreviousCycle({ assessment, cycle })

  if (Objects.isNil(previousCycle)) return ``

  return `union
      select odpd.country_iso
           , odpd.year
           , odpd.forest_area
           , odpd.other_wooded_land
           , odpd.natural_forest_area
           , odpd.plantation_forest_area
           , odpd.plantation_forest_introduced_area
           , odpd.other_planted_forest_area
           , odpd.planted_forest
           , odpd.total
           , odpd.total_land_area
           , odpd.other_land
           , odpd.total_forest_area
           , odpd.primary_forest
           , odpd.id
      from ${Schemas.getNameCycle(assessment, previousCycle)}.original_data_point_data odpd
      where country_iso in ('${countryISOs.map((c) => `${c}`).join(',')}')
        -- exclude modified odp from history
        and odpd.year not in (select distinct (ao.target ->> 'year')::integer from activities_odp ao)`
}

export const getOriginalDataPointDataLastApproved = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const activities = `
      with activities as (${OriginalDataPointQueries.getLastAcceptedActivity(props)})
         , activities_odp as
          (select *
           from activities a
           where a.row_number = 1)
         , total_land_area as (${NodeExtQueries.getTotalLandArea(schemaCycle)})
-- create original_data_point_data table format from activities
      select ao.country_iso
           , (ao.target ->> 'year')::integer                                       as year
           , (ao.target -> 'values' ->> 'forestArea')::numeric                     as forest_area
           , (ao.target -> 'values' ->> 'otherWoodedLand')::numeric                as other_wooded_land
           , (ao.target -> 'values' ->> 'naturalForestArea')::numeric              as natural_forest_area
           , (ao.target -> 'values' ->> 'plantationForestArea')::numeric           as plantation_forest_area
           , (ao.target -> 'values' ->> 'plantationForestIntroducedArea')::numeric as plantation_forest_introduced_area
           , (ao.target -> 'values' ->> 'otherPlantedForestArea')::numeric         as other_planted_forest_area
           , (ao.target -> 'values' ->> 'plantedForest')::numeric                  as planted_forest
           , (ao.target -> 'values' ->> 'total')::numeric                          as total
           , tla.value                                                             as total_land_area
           , ${OriginalDataPointQueries.getOtherLand(`ao.target -> 'values'`)}
           , (ao.target -> 'values' ->> 'totalForestArea')::numeric                as total_forest_area
           , (ao.target -> 'values' ->> 'primaryForest')::numeric                  as primary_forest
           , (ao.target ->> 'id')::integer                                         as id
      from activities_odp ao
               left join total_land_area tla on ao.country_iso = tla.country_iso and ao.target ->> 'year' = tla.col_name
      -- excluding removed ODPs
      where ao.message <> '${ActivityLogMessage.originalDataPointRemove}'
-- merge with prev cycle ODPs
          ${_getPrevCycleODPData(props)}
  `

  const query = OriginalDataPointQueries.getOriginalDataPointData({ selectFrom: `(${activities})` })

  return client.one<RecordAssessmentData>(query, [], ({ data }) => Objects.camelize(data))
}
