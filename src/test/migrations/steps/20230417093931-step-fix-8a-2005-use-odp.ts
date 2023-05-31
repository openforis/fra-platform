import { BaseProtocol, Schemas } from 'server/db'

import { AssessmentCycleUtil } from 'test/migrations/steps/utils/getAssessmentCycle'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)
  await client.query(`
      update
          assessment_fra.col c
      set props = jsonb_set(c.props, '{calculateFn, ${cycle.uuid}}',
                            ('"extentOfForest.forestArea[''2005''] ? (extentOfForest.forestArea[''2005''] / extentOfForest.totalLandArea[''2005''] * 100) : (extentOfForest.forestArea[''2000''] / extentOfForest.totalLandArea[''2000''] * 100 > 0 && extentOfForest.forestArea[''2010''] / extentOfForest.totalLandArea[''2010''] * 100) > 0 ? (extentOfForest.forestArea[''2000''] / extentOfForest.totalLandArea[''2000''] * 100 + (extentOfForest.forestArea[''2010''] / extentOfForest.totalLandArea[''2010''] * 100 - extentOfForest.forestArea[''2000''] / extentOfForest.totalLandArea[''2000''] * 100) * 5 / 10) : null"'::text)::jsonb)
      where c.id in (
          select c.id
          from ${schemaName}.table t
                   left join ${schemaName}.row r on t.id = r.table_id
                   left join ${schemaName}.col c on r.id = c.row_id
          where c.props ->> 'colName' in ('2005')
            and t.props ->> 'name' = 'sustainableDevelopment15_1_1'
      )
  `)
}
