import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025', metaCache: true },
    client
  )

  const schemaName = Schemas.getName(assessment)

  await client.query(
    `
      update ${schemaName}.section
      set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"growingStockComposition.forestGrowingStockComposition"')
      where props ->> 'name' = 'growingStockComposition';
    `
  )

  await AssessmentController.generateMetadataCache({ assessment }, client)
}
