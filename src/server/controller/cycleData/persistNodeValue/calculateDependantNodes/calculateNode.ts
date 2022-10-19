import { Numbers } from '@utils/numbers'

import { ActivityLogMessage, Node, NodeValue, Row } from '@meta/assessment'

import { getTableData } from '@server/controller/cycleData/getTableData'
import { ExpressionEvaluator } from '@server/controller/cycleData/persistNodeValue/expressionEvaluator'
import { persistNode } from '@server/controller/cycleData/persistNodeValue/persistNode/persistNode'
import { Props } from '@server/controller/cycleData/persistNodeValue/props'
import { BaseProtocol } from '@server/db'

export const calculateNode = async (
  props: Omit<Props, 'value'> & { expression: string; row: Row },
  client: BaseProtocol
): Promise<Node> => {
  const { countryIso, assessment, cycle, sectionName, tableName, variableName, colName, expression, row, user } = props
  const dependencies = assessment.metaCache.calculations.dependencies[tableName]?.[variableName]
  const data = await getTableData(
    {
      aggregate: false,
      columns: [],
      mergeOdp: true,
      tableNames: [],
      variables: [],
      assessment,
      cycle,
      countryISOs: [countryIso],
      dependencies,
    },
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

  const roundedResult = Numbers.format(Numbers.toBigNumber(rawResult))

  const value: NodeValue = { raw: rawResult ? roundedResult : null, calculated: true }

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
