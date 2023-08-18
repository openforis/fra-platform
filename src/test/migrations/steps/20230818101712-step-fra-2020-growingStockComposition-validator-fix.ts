import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne(
    {
      assessmentName: AssessmentNames.fra,
      metaCache: true,
    },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)
  const tableName = 'growingStockComposition'
  const variable = 'totalGrowingStock'

  await client.query(`
      update ${schemaAssessment}.row r
      set props = props #- '{validateFns}'
      from (select r2.id
            from ${schemaAssessment}.row r2
                     left join ${schemaAssessment}."table" t on r2.table_id = t.id
            where t.props ->> 'name' = '${tableName}'
              and r2.props ->> 'variableName' = '${variable}') r2
      where r.id = r2.id;
  `)
  await AssessmentController.generateMetaCache({ assessment, cycle }, client)
}
