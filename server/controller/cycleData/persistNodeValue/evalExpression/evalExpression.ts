import { CountryIso } from '@meta/area'
import { Assessment, Cycle, Row, VariableCache } from '@meta/assessment'
import { TableData } from '@meta/data'

import { BaseProtocol } from '@server/db'
import { RowRepository } from '@server/repository/assessment/row'
import { DataRepository, TablesCondition } from '@server/repository/assessmentCycle/data'

import { ExpressionEvaluator } from '../expressionEvaluator'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  tableName: string
  variableName: string
  colName: string
  data?: TableData
  row?: Row
  dependencies: Array<VariableCache>
  expression: string
}

const getTablesCondition = (props: Props): TablesCondition => {
  const { dependencies } = props
  const tables: TablesCondition = {}

  dependencies.forEach((d) => {
    if (!tables[d.tableName]) {
      tables[d.tableName] = { variables: [] }
    }
    const { variables } = tables[d.tableName]
    if (!tables[d.tableName]) tables[d.tableName] = {}
    if (!variables.find((v) => v === d.variableName)) {
      variables.push(d.variableName)
    }
    tables[d.tableName] = { variables }
  })

  return tables
}

const getTableData = async (props: Props, client: BaseProtocol): Promise<TableData> => {
  const { assessment, cycle, countryIso, data: dataProps } = props

  let tableData: TableData = dataProps

  if (!tableData) {
    const tables = getTablesCondition(props)
    if (Object.keys(tables).length > 0) {
      tableData = await DataRepository.getTableData({ assessment, cycle, countryISOs: [countryIso], tables }, client)
    }
  }

  if (!tableData) {
    tableData = {} as TableData
  }

  return tableData
}

export const evalExpression = async <ReturnType>(props: Props, client: BaseProtocol): Promise<ReturnType> => {
  const { assessment, countryIso, tableName, variableName, colName, row: rowProps, expression } = props

  const data = await getTableData(props, client)
  const row: Row = rowProps || (await RowRepository.getOne({ assessment, tableName, variableName }, client))

  return ExpressionEvaluator.evalFormula<ReturnType>({
    assessment,
    countryIso,
    data,
    colName,
    row,
    formula: expression,
  })
}
