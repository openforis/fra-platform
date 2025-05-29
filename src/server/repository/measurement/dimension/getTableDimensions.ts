import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Dimension } from 'meta/measurement/dimension'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  tableName: string
}

export const getTableDimensions = async (props: Props, client: BaseProtocol = DB): Promise<Array<Dimension>> => {
  const { assessment, tableName } = props
  const schemaName = Schemas.getName(assessment)

  return client.map<Dimension>(
    `
    with extracted_dimension_names as (
      select distinct jsonb_array_elements_text(cn.names) as name
      from ${schemaName}."table" t,
           jsonb_each(t.props -> 'columnNames') as cn(cycle_uuid, names)
      where t.props ->> 'name' = $1
        and t.props -> 'columnNames' is not null
      union
      select distinct elem ->> 'columnName' as name
      from ${schemaName}."table" t,
           jsonb_each(t.props -> 'cellsExportAlways') as cea(cycle_uuid, arr),
           jsonb_array_elements(cea.arr) as elem
      where t.props ->> 'name' = $1
        and t.props -> 'cellsExportAlways' is not null
    )

    select distinct d.*
    from extracted_dimension_names edn
    join measurement.dimension d on d.name = edn.name;
    `,
    [tableName],
    (dimension) => Objects.camelize(dimension)
  )
}
