import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    {
      assessmentName: AssessmentNames.panEuropean,
      cycleName: '2025',
      metaCache: true,
    },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)
  const tableName = 'table_4_4a'

  await client.query(`
    UPDATE ${schemaAssessment}.col c
    SET props = props - 'linkedNodes'
    FROM (
      SELECT c2.id
      FROM ${schemaAssessment}.col c2
      LEFT JOIN ${schemaAssessment}.row r ON c2.row_id = r.id
      LEFT JOIN ${schemaAssessment}.table t ON r.table_id = t.id
      WHERE t.props ->> 'name' = '${tableName}' AND c2.props ? 'linkedNodes'
    ) sub
    WHERE c.id = sub.id
  `)
  await AssessmentController.generateMetaCache({ assessment, cycle }, client)
}
