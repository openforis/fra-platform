import { ITask } from 'pg-promise'

import { Assessment } from '../../../src/meta/assessment/assessment'
import { Col } from '../../../src/meta/assessment/col'
import { Cycle } from '../../../src/meta/assessment/cycle'
import { RowType } from '../../../src/meta/assessment/row'
import { Table } from '../../../src/meta/assessment/table'
import { DBNames } from '../_DBNames'
import * as sqlCreator from '../dataTable/dataTableSqlCreator'
import { getMapping } from '../dataTable/tableMappings'
import { DatumLegacy, NodeRow } from './_getNodeInserts'
import { getCols, getRows } from './_repos'

export const _getNodeInsertsDegradedForest = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    countryISOs: Array<string>
    table: Table
  },
  client: ITask<any>
): Promise<Array<NodeRow>> => {
  const { assessment, cycle, countryISOs, table } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)
  const mapping = getMapping(table.props.name)
  const rows = await getRows(client, schema, table)
  const cols = await getCols(client, schema, table)
  const rowsData = rows.filter((row) => row.props.type === RowType.data)
  // const colIndexes = getColIndexes(rowsData, cols)
  const { name: tableName, columnNames } = table.props

  const values: Array<NodeRow> = []
  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const [selectQuery, selectParams] = sqlCreator.createSelect(countryIso, tableName, '_legacy')
      let data = (await client.manyOrNone<DatumLegacy>(selectQuery, selectParams)) as Array<DatumLegacy>
      if (data.length === 0) data = []

      rowsData.forEach((row) => {
        const rowName = row.props.variableName
        columnNames[cycle.uuid].forEach((colName, colIndex) => {
          const col: Col = cols.find((c) => c.rowId === row.id && c.props.colName === colName)
          const dataRow = data.find((d) => d.row_name === rowName)
          if (dataRow && col) {
            const columnMapping = mapping.columns[rowName === 'national_definition' ? 1 : colIndex]
            const datum = dataRow[columnMapping.name]
            values.push({
              country_iso: countryIso,
              col_uuid: col.uuid,
              row_uuid: row.uuid,
              value: { raw: datum ? String(datum) : null },
            })
          }
        })
      })
    })
  )
  return values
}
