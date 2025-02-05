import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { updateODPDependencies } from 'test/migrations/steps/utils/updateODPDependencies'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )
  const schemaName = Schemas.getNameCycle(assessment, cycle)
  await client.query(`
    update ${schemaName}.original_data_point
    set values = values || '{"plantationForestIntroducedArea": "0"}'
    where
      values ->> 'plantationForestArea' = '0' and
      values ->> 'plantationForestIntroducedArea' is null;
  `)

  await AssessmentController.generateDataCache({ assessment, cycle, force: true }, client)
  await updateODPDependencies({ assessment, cycle })
}
