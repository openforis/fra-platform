import { AssessmentNames } from 'meta/assessment/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const assessmentName = AssessmentNames.fra
const cycleName = '2025'
const tableName = 'forestRestoration'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    {
      assessmentName,
      cycleName,
    },
    client
  )

  const cycleUuid = cycle.uuid
  const schemaAssessment = Schemas.getName(assessment)

  // 1. Update gridTemplateColumns
  const gridTemplateColumns = 'minmax(min-content, 1fr) minmax(min-content, 2fr)'
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
      jsonb_set(
        props,
        '{style}',
        coalesce(props->'style', '{}'::jsonb),
        true
      ),
      '{style,${cycleUuid}}',
      $1::jsonb,
      true
     )
     where props->>'name' = '${tableName}'
    `,
    [JSON.stringify({ gridTemplateColumns })]
  )

  // 2. Set header colSpan to 1
  await client.query(
    `update ${schemaAssessment}.col c
     set props = jsonb_set(props, '{style,${cycleUuid},colSpan}', '1', true)
     where c.props ->> 'colType' = 'header'
       and c.props ->> 'index' = 'header_0'
       and c.row_id in (
         select r.id from ${schemaAssessment}.row r
         left join ${schemaAssessment}."table" t on t.id = r.table_id
         where r.props ->> 'type' = 'data'
       and r.props ->> 'index' = '0'
       and t.props ->> 'name' = '${tableName}'
     )
    `
  )

  // 3. Remove "if yes" cell
  await client.query(
    `update ${schemaAssessment}.col c
     set props = jsonb_set(
       (
         props
         #- '{style,${cycleUuid}}'
         #- '{labels,${cycleUuid}}'
       ),
       '{cycles}',
       (props->'cycles') - '${cycleUuid}',
       true
     )
     where c.props->>'colType' = 'header'
       and c.props->>'index' = 'header_0'
       and c.row_id in (
         select r.id
         from ${schemaAssessment}.row r
         left join ${schemaAssessment}."table" t on t.id = r.table_id
         where r.props->>'type' = 'data'
           and r.props->>'index' = '1'
           and t.props->>'name' = '${tableName}'
       )
    `
  )

  await AssessmentController.generateMetadataCache({ assessment }, client)
}
