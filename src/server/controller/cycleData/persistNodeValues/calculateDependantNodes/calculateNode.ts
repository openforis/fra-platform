import { ActivityLogMessage, Node, NodeValue, Row } from '@meta/assessment'

import { getTableData } from '@server/controller/cycleData/getTableData'
import { BaseProtocol } from '@server/db'

import { ExpressionEvaluator } from '../expressionEvaluator'
import { persistNode } from '../persistNode'
import { PersistNodeValueProps } from '../props'

export const calculateNode = async (
  props: Omit<PersistNodeValueProps, 'value'> & { expression: string; row: Row; mergeOdp: boolean },
  client: BaseProtocol
): Promise<Node> => {
  const {
    countryIso,
    assessment,
    cycle,
    sectionName,
    tableName,
    variableName,
    colName,
    expression,
    row,
    user,
    mergeOdp,
  } = props
  const dependencies = assessment.metaCache[cycle.uuid].calculations.dependencies[tableName]?.[variableName]
  const data = await getTableData(
    {
      aggregate: false,
      columns: [],
      mergeOdp,
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
    cycle,
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
