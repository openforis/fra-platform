import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessmentName = AssessmentNames.panEuropean
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName, cycleName: '2025' },
    client
  )
  const schemaAssessment = Schemas.getName(assessment)

  await client.query(`
      update ${schemaAssessment}.section s
      set props = props || jsonb_build_object('hidden', jsonb_build_object('${cycle.uuid}', to_jsonb(true)))
      from (select s.id
            from ${schemaAssessment}.section s
            where s.props ->> 'hidden' = 'true') as src
      where s.id = src.id
  `)

  await AssessmentController.generateMetaCache(client)

  const assessmentUpdate = await AssessmentController.getOne({ assessmentName }, client)
  await AssessmentController.generateMetadataCache({ assessment: assessmentUpdate }, client)
}
