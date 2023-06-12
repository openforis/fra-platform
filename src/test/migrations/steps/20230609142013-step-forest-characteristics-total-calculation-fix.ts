import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { runCalculations } from './utils/runCalculations'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025', metaCache: true },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const tableName = 'forestCharacteristics'

  const variableName = 'totalForestArea'

  const formula =
    '(forestCharacteristics.naturalForestArea || forestCharacteristics.plantationForestArea || forestCharacteristics.otherPlantedForestArea) ? (forestCharacteristics.naturalForestArea || 0) + (forestCharacteristics.plantationForestArea || 0) + (forestCharacteristics.otherPlantedForestArea || 0) : null'

  await client.query(
    `
      update ${schemaName}.row r
      set props = jsonb_set(r.props, '{calculateFn,${cycle.uuid}}', '"${formula}"')
      where id = (
        select id from ${schemaName}.row r
        where r.props->>'variableName' = $2
          and table_id = (
            select id from ${schemaName}.table where props->>'name' = $1
          )
      );
    `,
    [tableName, variableName]
  )

  await AssessmentController.generateMetaCache(
    {
      assessment,
      cycle,
    },
    client
  )

  await runCalculations(
    {
      assessment,
      cycle,
      variableName,
      tableName,
    },
    client
  )
}
