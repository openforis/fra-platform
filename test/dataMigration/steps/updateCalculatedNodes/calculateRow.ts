import { NodeRow } from '@test/dataMigration/types'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle, Row, VariableCache } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { evalExpression } from '@server/controller/cycleData/persistNodeValue/evalExpression'
import { BaseProtocol } from '@server/db'
import { ColRepository } from '@server/repository/assessment/col'
import { DataRepository, TablesCondition } from '@server/repository/assessmentCycle/data'

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
  const dependencies: Array<VariableCache> =
    assessment.metaCache.calculations.dependencies[tableName]?.[row.props.variableName] ?? []
  const tables = dependencies.reduce<TablesCondition>((acc, { tableName }) => ({ ...acc, [tableName]: {} }), {})
  const data =
    Object.keys(tables).length > 0
      ? await DataRepository.getTableData({ assessment, cycle, countryISOs, tables }, client)
      : undefined
  const table = await AssessmentController.getTable({ assessment, cycle, tableName })

  const cols = await ColRepository.getMany({ assessment, tableId: row.tableId }, client)
  await Promise.all(
    countryISOs.map(async (countryIso) => {
      await Promise.all(
        table.props.columnNames[cycle.uuid].map(async (colName) => {
          // const colName = Cols.getColName({ colIdx, cols })
          const col = cols.find((c) => c.rowId === row.id && c.props.colName === colName)
          if (!col) return
          const { variableName } = row.props

          const expression = row.props.calculateFn ?? col.props.calculateFn
          const raw = await evalExpression(
            { tableName, assessment, colName, countryIso, variableName, cycle, data, row, expression },
            client
          )

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
