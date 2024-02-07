import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  await client.query(`
      update ${schemaAssessment}.row r
      set props = src.props
      from (select r.id
                 , r.props || jsonb_build_object('withReview', jsonb_build_object('${cycle.uuid}', true)) as props
            from ${schemaAssessment}.row r
                     left join ${schemaAssessment}."table" t on r.table_id = t.id
            where t.props ->> 'name' in ('carbonStockSoilDepth', 'nonWoodForestProductsRemovalsCurrency')) as src
      where r.id = src.id
  `)

  await AssessmentController.generateMetadataCache({ assessment }, client)
}
