import { BaseProtocol } from '@server/db'
import { TableDataRepository, TablesCondition } from '@server/repository/cycleData'
import { TableData } from '@meta/data'
import { Row } from '@meta/assessment'
import { RowRepository } from '@server/repository/row'
import { ExpressionEvaluator } from '@server/controller/cycleData/persistNodeValue/expressionEvaluator'
import { Props } from './props'

export const evalExpression = async (props: Props, client: BaseProtocol): Promise<any> => {
  const { assessment, cycle, countryIso, tableName, variableName, colName } = props

  const dependencies = assessment.metaCache.calculations.dependencies[tableName]?.[variableName] ?? []
  const tables: TablesCondition = {}
  dependencies.forEach((d) => {
    if (!tables[d.tableName]) {
      tables[d.tableName] = { columns: [colName], variables: [] }
    }
    const { variables } = tables[d.tableName]
    if (!variables.find((v) => v === d.variableName)) {
      variables.push(d.variableName)
    }
    tables[d.tableName] = { variables, columns: [colName] }
  })

  const data: TableData =
    Object.keys(tables).length > 0
      ? await TableDataRepository.getTableData({ assessment, cycle, countryISOs: [countryIso], tables }, client)
      : ({} as TableData)
  const row: Row = await RowRepository.getOne({ assessment, tableName, variableName }, client)

  return ExpressionEvaluator.evalFormula({ assessment, countryIso, data, colName, row, formula: row.props.calculateFn })
}
