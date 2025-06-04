import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableCell } from 'meta/assessment/table'
import { ExplorerMetadata } from 'meta/explorer/metadata'
import { Dimensions } from 'meta/measurement/dimensions'
import { Measures } from 'meta/measurement/measures'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  tableName: string
}

export const getTableCellsExportAlways = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<ExplorerMetadata['cellsExportAlways']> => {
  const { assessment, cycle, tableName } = props
  const schemaName = Schemas.getName(assessment)

  const cellsExportAlways = await client.map<TableCell>(
    `
    select cells_export_always
    from ${schemaName}."table" t,
      jsonb_array_elements(
        coalesce(
         t.props -> 'cellsExportAlways' -> $2,
         '[]'::jsonb
        )
      ) as cells_export_always
    where
      t.props ->> 'name' = $1
  `,
    [tableName, cycle.uuid],
    (res) => Objects.camelize(res.cells_export_always)
  )

  return cellsExportAlways.map(({ columnName, variableName }) => {
    return {
      [Measures.variableNameToMeasureName(tableName, variableName)]: Dimensions.columnNameToDimensionName(
        tableName,
        columnName
      ),
    }
  })
}
