import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Dimension } from 'meta/measurement/dimension'
import { Dimensions } from 'meta/measurement/dimensions'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  tableName: string
}

export const getTableDimensions = async (props: Props, client: BaseProtocol = DB): Promise<Array<Dimension>> => {
  const { assessment, cycle, tableName } = props
  const schemaName = Schemas.getName(assessment)

  const columnNames = await client.map<string>(
    `
    select jsonb_array_elements_text(cn.names) as column_name
    from ${schemaName}."table" t,
         jsonb_each(t.props -> 'columnsExport') as cn(cycle_uuid, names)
    where t.props ->> 'name' = $1
      and cn.cycle_uuid = $2
      and t.props -> 'columnsExport' is not null
    union all
    select elem ->> 'columnName' as column_name
    from ${schemaName}."table" t,
         jsonb_each(t.props -> 'cellsExportAlways') as cea(cycle_uuid, arr),
         jsonb_array_elements(cea.arr) as elem
    where t.props ->> 'name' = $1
      and cea.cycle_uuid = $2
      and t.props -> 'cellsExportAlways' is not null
  `,
    [tableName, cycle.uuid],
    (row) => row.column_name
  )

  if (columnNames.length === 0) return []

  const dimensionNames = columnNames.map((cn) => Dimensions.columnNameToDimensionName(tableName, cn))

  return client.map<Dimension>(
    `
    with dimensions as (
      select *
      from unnest($1::text[]) with ordinality as dimensions(name, ord)
    )
    select d.name
    from dimensions
      join measurement.dimension d on d.name = dimensions.name
    order by dimensions.ord
    `,
    [dimensionNames],
    (dimension) => Objects.camelize(dimension)
  )
}
