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
    update ${schemaAssessment}."table" t
    set props = props
        || jsonb_build_object(
            'cellsExportAlways',
            jsonb_build_object(
                '${cycle.uuid}',
                '[{
                    "columnName": "mostRecentYear",
                    "variableName": "mostRecentYear",
                    "unit": null,
                    "format": "original"
                }]'::jsonb
            )
      )
    from (
      select t2.id
      from ${schemaAssessment}."table" t2
      left join ${schemaAssessment}.table_section ts on t2.table_section_id = ts.id
      left join ${schemaAssessment}.section s on s.id = ts.section_id
      where s.props ->> 'name' = 'growingStockComposition'
      and t2.props ->> 'name' = 'growingStockComposition2025'
    ) as src
    where t.id = src.id;
  `)

  await client.query(`
    update ${schemaAssessment}."row" r
    set props = props || jsonb_build_object('excludeFromDataExport', jsonb_build_object('${cycle.uuid}', true))
    where r.props ->> 'type' = 'data'
    and r.props ->> 'variableName' = 'mostRecentYear'
    and r.table_id = (
      select t.id
      from ${schemaAssessment}."table" t
      left join ${schemaAssessment}.table_section ts on t.table_section_id = ts.id
      left join ${schemaAssessment}.section s on s.id = ts.section_id
      where s.props ->> 'name' = 'growingStockComposition'
      and t.props ->> 'name' = 'growingStockComposition2025'
    );
  `)

  await AssessmentController.generateMetaCache(client)
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
