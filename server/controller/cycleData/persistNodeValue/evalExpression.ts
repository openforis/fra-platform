import { Row } from '@meta/assessment'
import { TableData } from '@meta/data'
import { BaseProtocol } from '@server/db'
import { RowRepository } from '@server/repository/assessment/row'
import { DataRepository, TablesCondition } from '@server/repository/assessmentCycle/data'

import { ExpressionEvaluator } from './expressionEvaluator'
import { Props } from './props'

export const evalExpression = async (
  props: Pick<Props, 'cycle' | 'variableName' | 'countryIso' | 'assessment' | 'colName' | 'tableName'> & {
    data?: TableData
    row?: Row
  } & { expression: string },
  client: BaseProtocol
): Promise<any> => {
  const { assessment, cycle, countryIso, tableName, variableName, colName, data, row: rowProps, expression } = props

  const dependencies = assessment.metaCache.calculations.dependencies[tableName]?.[variableName] ?? []
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

  let tableData: TableData = data
  if (Object.keys(tables).length > 0 && !tableData)
    tableData = await DataRepository.getTableData({ assessment, cycle, countryISOs: [countryIso], tables }, client)
  if (!tableData) tableData = {} as TableData
  const row: Row = rowProps || (await RowRepository.getOne({ assessment, tableName, variableName }, client))

  return ExpressionEvaluator.evalFormula({
    assessment,
    countryIso,
    data: tableData,
    colName,
    row,
    formula: expression,
  })
}
