import { ITask } from 'pg-promise'

import { Assessment, Col, RowType, Table } from '../../../meta/assessment'

import { getMapping } from '../dataTable/tableMappings'
import * as sqlCreator from '../dataTable/dataTableSqlCreator'
import { DBNames } from '../_DBNames'
import { getColIndexes, getCols, getRows } from './_repos'
import { DatumLegacy, NodeRow } from './_getNodeInserts'

export const _getNodeInsertsDegradedForest = async (
  props: {
    assessment: Assessment
    countryISOs: Array<string>
    table: Table
  },
  client: ITask<any>
): Promise<Array<NodeRow>> => {
  const { assessment, countryISOs, table } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mapping = getMapping(table.props.name)
  const rows = await getRows(client, schema, table)
  const cols = await getCols(client, schema, table)
  const rowsData = rows.filter((row) => row.props.type === RowType.data)
  const colIndexes = getColIndexes(rowsData, cols)

  const values: Array<NodeRow> = []
  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const [selectQuery, selectParams] = sqlCreator.createSelect(countryIso, table.props.name, '_legacy')
      let data = (await client.manyOrNone<DatumLegacy>(selectQuery, selectParams)) as Array<DatumLegacy>
      if (data.length === 0) data = []

      rowsData.forEach((row) => {
        const rowName = row.props.variableName
        colIndexes.forEach((colIndex) => {
          const col: Col = cols.find((c) => c.rowId === row.id && c.props.index === colIndex)
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
