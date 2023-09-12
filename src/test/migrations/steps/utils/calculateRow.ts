import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, AssessmentMetaCaches, Cycle, Row } from 'meta/assessment'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { CycleDataController } from 'server/controller/cycleData'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol } from 'server/db'

import { NodeRow } from 'test/dataMigration/types'

export const calculateRow = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    countryISOs: Array<CountryIso>
    row: Row
    tableName: string
    calculatedVariables: Record<string, Record<string, boolean>>
  },
  client: BaseProtocol
): Promise<Array<NodeRow>> => {
  const { assessment, cycle, countryISOs, row, tableName, calculatedVariables } = props
  const values: Array<NodeRow> = []
  const visited: Record<string, Record<string, Record<string, boolean>>> = {}

  // console.log('====== calculating ', tableName, row.props.variableName)
  const dependencies = AssessmentMetaCaches.getCalculationsDependencies({
    assessment,
    cycle,
    tableName,
    variableName: row.props.variableName,
  })

  const data = await CycleDataController.getTableData(
    {
      assessment,
      cycle,
      countryISOs,
      dependencies,
      aggregate: false,
      columns: [],
      mergeOdp: true,
      tableNames: [],
      variables: [],
    },
    client
  )

  const table = await MetadataController.getTable({ assessment, cycle, tableName })

  for (let i = 0; i < countryISOs.length; i += 1) {
    const countryIso = countryISOs[i]
    for (let j = 0; j < table.props.columnNames[cycle.uuid].length; j += 1) {
      const colName = table.props.columnNames[cycle.uuid][j]

      const col = row.cols.find((c) => c.props.colName === colName)
      // eslint-disable-next-line no-continue
      if (!col) continue

      const expression = row.props.calculateFn?.[cycle.uuid] ?? col.props.calculateFn?.[cycle.uuid]

      const raw = ExpressionEvaluator.evalFormula<string | undefined>({
        assessment,
        countryIso,
        cycle,
        data,
        colName,
        row,
        formula: expression,
      })

      const value: NodeRow = {
        country_iso: countryIso,
        row_uuid: row.uuid,
        col_uuid: col.uuid,
        value: { raw: !Objects.isEmpty(raw) ? String(raw) : null, calculated: true },
      }

      if (
        values.find(
          (v) => v.country_iso === value.country_iso && v.row_uuid === value.row_uuid && v.col_uuid === value.col_uuid
        )
      ) {
        throw new Error(`Duplicate node ${JSON.stringify(value)}`)
      }

      if (visited[countryIso]?.[row.uuid]?.[col.uuid]) {
        throw new Error(`Duplicate node ${JSON.stringify(value)}`)
      }

      values.push(value)
      if (!visited[countryIso]) visited[countryIso] = {}
      if (!visited[countryIso][row.uuid]) visited[countryIso][row.uuid] = {}
      visited[countryIso][row.uuid][col.uuid] = true
    }
  }

  if (!calculatedVariables[tableName]) calculatedVariables[tableName] = {}
  calculatedVariables[tableName][row.props.variableName] = true

  // eslint-disable-next-line consistent-return
  return values
}
