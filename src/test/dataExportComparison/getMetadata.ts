import { AssessmentController } from '@server/controller/assessment'
import { DB, Schemas } from '@server/db'

import { MetadataLocal } from '@test/dataExportComparison/types'

export const getMetadata = async (): Promise<MetadataLocal> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({
    assessmentName: 'fra',
    cycleName: '2020',
  })
  const schema = Schemas.getName(assessment)
  const { metadata } = await DB.one<{
    metadata: MetadataLocal
  }>(`
      with d as (select t.props ->> 'name'                            as name,
                        t.props -> 'columnsExport' -> '${cycle.uuid}' as columns,
                        jsonb_agg(r.props ->> 'variableName')         as variables
                 from ${schema}."table" t
                          left join ${schema}.table_section ts on ts.id = t.table_section_id
                          left join ${schema}.section s on s.id = ts.section_id
                          left join ${schema}.row r on t.id = r.table_id
                 where (s.props ->> 'dataExport')::boolean
                   and (t.props ->> 'dataExport')::boolean
                   and (r.props -> 'variableName') is not null
                   and t.props -> 'cycles' ? '${cycle.uuid}'
                   and r.props -> 'cycles' ? '${cycle.uuid}'
                 group by 1, 2)
      select jsonb_object_agg(d.name, jsonb_build_object('columns', d.columns, 'variables', d.variables)) as metadata
      from d
      where d.variables is not null
        and d.columns is not null
  `)
  return metadata
}
