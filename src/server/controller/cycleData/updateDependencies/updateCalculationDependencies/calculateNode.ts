import { Objects } from 'utils/objects'

import { ActivityLogMessage, AssessmentMetaCaches, NodeValue, Row } from 'meta/assessment'
import { NodeUpdates } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { getTableData } from 'server/controller/cycleData/getTableData'
import { BaseProtocol } from 'server/db'

import { persistNode } from '../../persistNodeValues/persistNode'
import { PersistNodeValueProps } from '../../persistNodeValues/props'

export const calculateNode = async (
  props: Omit<PersistNodeValueProps, 'value'> & {
    formula: string
    row: Row
    mergeOdp: boolean
    nodeUpdates: NodeUpdates
  },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, colName, countryIso, cycle, formula, mergeOdp, nodeUpdates, row, sectionName, tableName, user, variableName } = props
  const dependencies = AssessmentMetaCaches.getCalculationsDependencies({ assessment, cycle, variableName, tableName })
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
    formula,
  })

  // Objects.isEmpty required to avoid failing on 0
  const value: NodeValue = { raw: !Objects.isEmpty(rawResult) ? String(rawResult) : null, calculated: true }

  const node = await persistNode(
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
  nodeUpdates.nodes.push({ tableName, variableName, colName, value: node.value })
}
