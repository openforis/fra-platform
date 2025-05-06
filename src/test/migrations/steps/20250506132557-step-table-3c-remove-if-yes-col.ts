import { AssessmentNames } from 'meta/assessment/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const removeFraForestRestorationIfYesColumn = async (props: { cycleName: string }, client: BaseProtocol) => {
  const { cycleName } = props
  const assessmentName = AssessmentNames.fra
  const tableName = 'forestRestoration'

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
}

export default async (client: BaseProtocol) => {
  const cycles = ['2025', 'latest']
  await Promise.all(cycles.map((cycleName) => removeFraForestRestorationIfYesColumn({ cycleName }, client)))

  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
