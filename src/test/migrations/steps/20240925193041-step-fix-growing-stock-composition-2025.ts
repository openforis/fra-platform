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
    set props = jsonb_set(
        jsonb_set(
          jsonb_set(
            props,
            '{columnNames,${cycle.uuid}}',
            '["scientific_name", "common_name", "growingStockMillionCubicMeter", "growingStockPercent"]'::jsonb
          ),
          '{columnsExport,${cycle.uuid}}',
          '["scientific_name", "common_name", "growingStockMillionCubicMeter", "growingStockPercent"]'::jsonb
        ),
        '{columnsExportAlways,${cycle.uuid}}',
        '[]'::jsonb
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

  await AssessmentController.generateMetadataCache({ assessment }, client)
}
