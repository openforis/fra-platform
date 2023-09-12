import { BaseProtocol, Schemas } from 'server/db'

import { AssessmentCycleUtil } from 'test/migrations/steps/utils/getAssessmentCycle'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)

  await client.query(
    `update ${schemaName}.row r
                      set props = jsonb_set(r.props, '{validateFns}',
                                            jsonb_set(r.props -> 'validateFns', '{${cycle.uuid}}',
                                                      ('["validatorEqualToPreviousCycleForestArea(fra[''2020''].extentOfForest.forestArea,fra[''2025''].extentOfForest.forestArea)"]'::text)::jsonb,
                                                      true), true)

                      where id in (select id
                                   from ${schemaName}.row r
                                   where r.props ->> 'variableName' = 'forestArea'
                                     and r.table_id in (select id
                                                        from ${schemaName}.table t
                                                        where t.props ->> 'name' = 'extentOfForest'));`
  )
}
