import { Row, Table } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaName = Schemas.getName(assessment)

  const table = await client.one<Table>(
    `select * from ${schemaName}.table where props->>'name' = $1;`,
    'forestAreaChange'
  )

  const ofWhichAfforestation = await client.one<Row>(
    `select * from ${schemaName}.row r where props->>'variableName' = $1 and table_id = $2;`,
    ['afforestation', table.id]
  )

  const ofWhichNaturalExpansion = await client.one<Row>(
    `select * from ${schemaName}.row r where props->>'variableName' = $1 and table_id = $2;`,
    ['natural_expansion', table.id]
  )

  await client.query(
    `update ${schemaName}.row r set props = jsonb_set(r.props, '{validateFns, ${cycle.uuid}}',
      ('[
        "validatorSubCategory(forestAreaChange.forest_expansion, [forestAreaChange.afforestation])",
        "validatorEqualToForestExpansion(forestAreaChange.forest_expansion, [forestAreaChange.afforestation, forestAreaChange.natural_expansion])"
      ]'::text)::jsonb)
    where id = $1;`,
    ofWhichAfforestation.id
  )

  await client.query(
    `update ${schemaName}.row r set props = jsonb_set(r.props, '{validateFns, ${cycle.uuid}}',
      ('[
        "validatorSubCategory(forestAreaChange.forest_expansion, [forestAreaChange.natural_expansion])",
        "validatorEqualToForestExpansion(forestAreaChange.forest_expansion, [forestAreaChange.afforestation, forestAreaChange.natural_expansion])"
      ]'::text)::jsonb)
    where id = $1;`,
    ofWhichNaturalExpansion.id
  )

  await AssessmentController.generateMetaCache(
    {
      assessment,
      cycle,
    },
    client
  )
}
