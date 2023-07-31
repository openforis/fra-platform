import { Objects } from 'utils/objects'

import { ActivityLogMessage, AssessmentMetaCaches, NodeValue, Row } from 'meta/assessment'
import { NodeUpdates, RecordAssessmentDatas } from 'meta/data'
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
  const {
    assessment,
    colName,
    countryIso,
    cycle,
    formula,
    mergeOdp,
    nodeUpdates,
    row,
    sectionName,
    tableName,
    user,
    variableName,
  } = props
  const dependencies = AssessmentMetaCaches.getCalculationsDependencies({ assessment, cycle, variableName, tableName })
  const data = await getTableData(
    {
      aggregate: false,
      columns: [],
      mergeOdp,
      tableNames: [tableName],
      variables: [],
      assessment,
      cycle,
      countryISOs: [countryIso],
      dependencies,
    },
    client
  )

  // verify node value has not been inserted manually (see mirror tables)
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const paramsValue = { assessmentName, cycleName, countryIso, tableName, variableName, colName, data }
  const value = RecordAssessmentDatas.getNodeValue(paramsValue)
  if (Objects.isEmpty(value) || value.calculated) {
    const paramsCalculate = { assessment, countryIso, cycle, data, colName, row, formula }
    const rawResult = ExpressionEvaluator.evalFormula<string | undefined>(paramsCalculate)

    // Objects.isEmpty required to avoid failing on 0
    const value: NodeValue = { raw: !Objects.isEmpty(rawResult) ? String(rawResult) : null, calculated: true }

    const activityLogMessage = ActivityLogMessage.nodeValueCalculatedUpdate
    const node = await persistNode(
      { countryIso, assessment, cycle, sectionName, tableName, variableName, colName, user, value, activityLogMessage },
      client
    )
    nodeUpdates.nodes.push({ tableName, variableName, colName, value: node.value })
  }
}
