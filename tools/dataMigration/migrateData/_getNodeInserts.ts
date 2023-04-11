import { Assessment } from '../../../src/meta/assessment/assessment'
import { Col } from '../../../src/meta/assessment/col'
import { Cycle } from '../../../src/meta/assessment/cycle'
import { NodeValue } from '../../../src/meta/assessment/node'
import { RowType } from '../../../src/meta/assessment/row'
import { Table } from '../../../src/meta/assessment/table'
import { BaseProtocol } from '../../../src/server/db'
import { DBNames } from '../_DBNames'
import * as sqlCreator from '../dataTable/dataTableSqlCreator'
import { getCols, getRows } from './_repos'

const columnsSwap: Record<string, string> = {
  unspecified_mixed_damage_2025: 'unspecified_mixed_damage',
}

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
    cycle: Cycle
    countryISOs: Array<string>
    table: Table
    legacySchema: string
  },
  client: BaseProtocol
): Promise<Array<NodeRow>> => {
  const { assessment, cycle, countryISOs, table, legacySchema } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)
  const rows = await getRows(client, schema, table)
  const cols = await getCols(client, schema, table)
  const rowsData = rows.filter((row) => row.props.type === RowType.data)
  // const colIndexes = getColIndexes(rowsData, cols)
  const { name: tableName, columnNames } = table.props

  const values: Array<NodeRow> = []
  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const [selectQuery, selectParams] = sqlCreator.createSelect(countryIso, tableName, legacySchema)
      let data = (await client.manyOrNone<DatumLegacy>(selectQuery, selectParams)) as Array<DatumLegacy>
      if (data.length === 0) data = []

      rowsData.forEach((row) => {
        const rowName = row.props.variableName
        columnNames[cycle.uuid].forEach((colName) => {
          const col: Col = cols.find((c) => c.rowId === row.id && c.props.colName === colName)
          const dataRow = data.find((d) => d.row_name === rowName)
          if (dataRow && col) {
            const datum = dataRow[columnsSwap[col.props.colName] ?? col.props.colName]
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
