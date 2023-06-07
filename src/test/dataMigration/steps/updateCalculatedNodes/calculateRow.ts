import { CountryIso } from 'meta/area'
import { Assessment, AssessmentMetaCaches, Cycle, Row, VariableCache } from 'meta/assessment'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { CycleDataController } from 'server/controller/cycleData'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol } from 'server/db'

import { NodeRow } from 'test/dataMigration/types'

const hasBeenCalculated = (props: {
  variable: VariableCache
  variablesToCalculate: Array<VariableCache>
  calculatedVariables: Record<string, Record<string, boolean>>
}): boolean => {
  const { variable, variablesToCalculate, calculatedVariables } = props
  const variableToCalc = variablesToCalculate.find(
    (v) => v.tableName === variable.tableName && v.variableName === variable.variableName
  )
  if (variableToCalc) {
    return Boolean(calculatedVariables[variable.tableName]?.[variable.variableName])
  }
  return true
}

export const calculateRow = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    countryISOs: Array<CountryIso>
    row: Row
    tableName: string
    variablesToCalculate: Array<VariableCache>
    calculatedVariables: Record<string, Record<string, boolean>>
  },
  client: BaseProtocol
): Promise<Array<NodeRow>> => {
  const { assessment, cycle, countryISOs, row, tableName, variablesToCalculate, calculatedVariables } = props
  const values: Array<NodeRow> = []
  const visited: Record<string, Record<string, Record<string, boolean>>> = {}

  if (
    hasBeenCalculated({
      variable: { variableName: row.props.variableName, tableName },
      variablesToCalculate,
      calculatedVariables,
    })
  ) {
    return Promise.resolve([])
  }

  // console.log('====== calculating ', tableName, row.props.variableName)
  const dependencies = AssessmentMetaCaches.getCalculationsDependencies({
    assessment,
    cycle,
    tableName,
    variableName: row.props.variableName,
  })
  const data =
    dependencies.length > 0
      ? await CycleDataController.getTableData(
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
      : undefined
  const table = await MetadataController.getTable({ assessment, cycle, tableName })

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      await Promise.all(
        table.props.columnNames[cycle.uuid].map(async (colName) => {
          // const colName = Cols.getColName({ colIdx, cols })
          const col = row.cols.find((c) => c.props.colName === colName)
          if (!col) return

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
            value: { raw: raw ? String(raw) : null, calculated: true },
          }
          if (
            values.find(
              (v) =>
                v.country_iso === value.country_iso && v.row_uuid === value.row_uuid && v.col_uuid === value.col_uuid
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
        })
      )
    })
  )
  if (!calculatedVariables[tableName]) calculatedVariables[tableName] = {}
  calculatedVariables[tableName][row.props.variableName] = true

  return values
}
