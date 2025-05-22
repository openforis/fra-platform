import { AssessmentNames } from 'meta/assessment/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, Schemas } from 'server/db'

const areaBasedTables = [
  'areaAffectedByFire',
  'areaOfPermanentForestEstate',
  'disturbances',
  'extentOfForest',
  'forestAreaWithinProtectedAreas',
  'forestOwnership',
  'holderOfManagementRights',
  'otherLandWithTreeCover',
  'primaryDesignatedManagementObjective',
  'specificForestCategories',
  'sustainableDevelopment15_2_1_5',
  'totalAreaWithDesignatedManagementObjective',
]

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)
  const areaBasedTablesString = areaBasedTables.map((n) => `'${n}'`).join(', ')

  // 1. Migrate area based measures
  await client.query(
    `
    insert into measurement.measure (name, system_uuid)
    select v.name, som.uuid
    from (
      select distinct
        r.props ->> 'variableName' as name
      from ${schemaAssessment}.row r
      join ${schemaAssessment}."table" t
        on t.id = r.table_id
      where t.props ->> 'name' in (${areaBasedTablesString})
        and r.props ->> 'variableName' is not null
        and r.props ->> 'variableName' <> ''
    ) as v
    cross join (
      select som.uuid
      from measurement.system_of_measurement som
      where som.name = 'area'
    ) as som
    on conflict (name) do nothing;
    `
  )

  // 2. Migrate area based dimensions
  await client.query(
    `
    insert into measurement.dimension (name)
    select distinct
      dim.name
    from ${schemaAssessment}."table" t
    cross join lateral
      jsonb_each(t.props -> 'columnNames') as cn(cycle_uuid, names)
    cross join lateral
      jsonb_array_elements_text(cn.names) as dim(name)
    where t.props ->> 'name' in (${areaBasedTablesString})
      and t.props -> 'columnNames' is not null
    on conflict (name) do nothing;
    `
  )

  await CacheController.generateExplorerMetadata({ assessment, cycle }, client)
}
