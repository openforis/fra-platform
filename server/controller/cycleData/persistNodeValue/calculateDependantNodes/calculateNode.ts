import { ActivityLogMessage, Node, NodeValue, Row } from '@meta/assessment'

import { ExpressionEvaluator } from '@server/controller/cycleData/persistNodeValue/expressionEvaluator'
import { persistNode } from '@server/controller/cycleData/persistNodeValue/persistNode/persistNode'
import { Props } from '@server/controller/cycleData/persistNodeValue/props'
import { BaseProtocol } from '@server/db'
import { DataRepository } from '@server/repository/assessmentCycle/data'

export const calculateNode = async (
  props: Omit<Props, 'value'> & { expression: string; row: Row },
  client: BaseProtocol
): Promise<Node> => {
  const { countryIso, assessment, cycle, sectionName, tableName, variableName, colName, expression, row, user } = props
  const dependencies = assessment.metaCache.calculations.dependencies[tableName]?.[variableName]
  const data = await DataRepository.getTableData(
    { assessment, cycle, countryISOs: [countryIso], tables: {}, dependencies },
    client
  )
  const rawResult = ExpressionEvaluator.evalFormula<string | undefined>({
    assessment,
    countryIso,
    data,
    colName,
    row,
    formula: expression,
  })
  const value: NodeValue = { raw: rawResult ? String(rawResult) : null, calculated: true }

  return persistNode(
    {
      countryIso,
      assessment,
      cycle,
      sectionName,
      tableName,
      variableName,
      colName,
      user,
      value,
      activityLogMessage: ActivityLogMessage.nodeValueCalculatedUpdate,
    },
    client
  )
}
