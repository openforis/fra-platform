import { TableData } from '@meta/data'
import { Row } from '@meta/assessment'
import { BaseProtocol } from '@server/db'
import { CycleDataRepository, TablesCondition } from '@server/repository/cycleData'
import { RowRepository } from '@server/repository/row'

import { ExpressionEvaluator } from './expressionEvaluator'
import { Props } from './props'

export const evalExpression = async (
  props: Pick<Props, 'cycle' | 'variableName' | 'countryIso' | 'assessment' | 'colName' | 'tableName'> & {
    data?: TableData
    row?: Row
  },
  client: BaseProtocol
): Promise<any> => {
  const { assessment, cycle, countryIso, tableName, variableName, colName, data, row: rowProps } = props

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

  let tableData: TableData = data
  if (Object.keys(tables).length > 0 && !tableData)
    tableData = await CycleDataRepository.getTableData({ assessment, cycle, countryISOs: [countryIso], tables }, client)
  if (!tableData) tableData = {} as TableData
  const row: Row = rowProps || (await RowRepository.getOne({ assessment, tableName, variableName }, client))

  return ExpressionEvaluator.evalFormula({
    assessment,
    countryIso,
    data: tableData,
    colName,
    row,
    formula: row.props.calculateFn,
  })
}
