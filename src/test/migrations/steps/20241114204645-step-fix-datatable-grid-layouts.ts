import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  // Fix 2a Growing stock status description -> tier status
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        (props->'columnNames'->'${cycle.uuid}')::jsonb || $1::jsonb
     )
      where props->>'name' = 'growingStock_growingStockStatus_Description'
    `,
    [JSON.stringify(['tier'])]
  )

  // Fix 2c Biomass stock status description -> tier status
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        (props->'columnNames'->'${cycle.uuid}')::jsonb || $1::jsonb
     )
      where props->>'name' = 'biomassStock_biomassStockStatus_Description'
    `,
    [JSON.stringify(['tier'])]
  )

  // Fix 3b Forest area within protected areas
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
     )
     where props->>'name' = 'forestAreaWithinProtectedAreas'
    `,
    [JSON.stringify(['1990', '2000', '2010', '2015', '2020', '2025'])]
  )
  // Fix area header colSpan
  await client.query(
    `update ${schemaAssessment}.col c
     set props = jsonb_set( props, '{style,${cycle.uuid}}', '{"colSpan": 6}', true)
     where c.props ->> 'colType' = 'header'
        and c.props ->> 'index' = '1'
        and c.row_id in (
          select r.id from ${schemaAssessment}.row r
          left join ${schemaAssessment}."table" t on t.id = r.table_id
          where r.props ->> 'type' = 'header'
        and r.props ->> 'index' = 'header_0'
        and t.props ->> 'name' = 'forestAreaWithinProtectedAreas'
      )
  `
  )

  await AssessmentController.generateMetadataCache({ assessment }, client)
}
