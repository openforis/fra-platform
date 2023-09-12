import { BaseProtocol, Schemas } from 'server/db'

import { AssessmentCycleUtil } from 'test/migrations/steps/utils/getAssessmentCycle'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)
  // 5a
  await client.query(`
      update
          ${schemaName}.row r
      set props = jsonb_set(r.props, '{validateFns, ${cycle.uuid}}',
                            ('[
         "validatorNotGreaterThanForestOrMaxForest(extentOfForest.forestArea, disturbances.'::text || (r.props ->> 'variableName')::text || ', maxForestArea())",
         "validatorColSumNotGreaterThanForest((disturbances.insects || 0) + (disturbances.diseases || 0) + (disturbances.severe_weather_events || 0) + (disturbances.other || 0), (extentOfForest.forestArea  || maxForestArea()) )"
     ]'::text)::jsonb)
      where r.table_id in (select id from ${schemaName}.table t where t.props ->> 'name' = 'disturbances')
        and r.props ->> 'type' = 'data'
        and r.props ->> 'validateFns' is not null
        and r.props -> 'cycles' ? '${cycle.uuid}'::text
      returning *;
  `)
  // 5b …of which on forest
  await client.query(`
      update
          ${schemaName}.row r
      set props = jsonb_set(r.props, '{validateFns, ${cycle.uuid}}',
                            ('["validatorNotGreaterThanForestOrMaxForest(extentOfForest.forestArea, areaAffectedByFire.of_which_on_forest, maxForestArea())"]'::text)::jsonb)
      where r.table_id = (select id from ${schemaName}.table t where t.props ->> 'name' = 'areaAffectedByFire')
        and r.props ->> 'type' = 'data'
        and r.props ->> 'validateFns' is not null
        and r.props -> 'cycles' ? '${cycle.uuid}'::text
        and r.props ->> 'variableName' = 'of_which_on_forest'
      returning *;
  `)
  // 5b Total land area affected by fire
  await client.query(`
      update
          ${schemaName}.row r
      set props = jsonb_set(r.props, '{validateFns, ${cycle.uuid}}',
                            ('["validatorNotGreaterThanLandAreaOrMaxLandArea(extentOfForest.totalLandArea, areaAffectedByFire.total_land_area_affected_by_fire, maxLandArea())"]'::text)::jsonb)
      where r.table_id = (select id from ${schemaName}.table t where t.props ->> 'name' = 'areaAffectedByFire')
        and r.props ->> 'type' = 'data'
        and r.props ->> 'validateFns' is not null
        and r.props -> 'cycles' ? '${cycle.uuid}'::text
        and r.props ->> 'variableName' = 'total_land_area_affected_by_fire'
      returning *;
  `)
}
