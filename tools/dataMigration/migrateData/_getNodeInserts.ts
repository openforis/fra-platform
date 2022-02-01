import { ITask } from 'pg-promise'

import { Assessment, Col, NodeValue, RowType, Table } from '../../../meta/assessment'

import * as sqlCreator from '../dataTable/dataTableSqlCreator'
import { DBNames } from '../_DBNames'
import { getColIndexes, getCols, getRows } from './_repos'

// eslint-disable-next-line camelcase
export type NodeRow = { country_iso: string; row_uuid: string; col_uuid: string; value: NodeValue }

export interface DatumLegacy extends Record<string, string> {
  // eslint-disable-next-line camelcase
  country_iso: string
  // eslint-disable-next-line camelcase
  row_name: string
}

export const _getNodeInserts = async (
  props: {
    assessment: Assessment
    countryISOs: Array<string>
    table: Table
  },
  client: ITask<any>
): Promise<Array<NodeRow>> => {
  const { assessment, countryISOs, table } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)
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
            const datum = dataRow[col.props.colName]
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
