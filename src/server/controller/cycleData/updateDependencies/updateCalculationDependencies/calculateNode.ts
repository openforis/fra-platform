import { Objects } from 'utils/objects'

import {
  ActivityLogMessage,
  AssessmentMetaCaches,
  ColName,
  NodeValue,
  Row,
  SectionName,
  TableName,
  VariableName,
} from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { User } from 'meta/user'

import { getTableData } from 'server/controller/cycleData/getTableData'
import { Context } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies/context'
import { BaseProtocol } from 'server/db'

import { persistNode } from '../../persistNodeValues/persistNode'

type Props = {
  context: Context
  sectionName: SectionName
  tableName: TableName
  variableName: VariableName
  row: Row
  colName: ColName
  formula: string
  mergeOdp: boolean
  user: User
}

export const calculateNode = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { context, colName, formula, mergeOdp, sectionName, tableName, variableName, row, user } = props
  const { assessment, cycle, countryIso } = context
  const dependencies = AssessmentMetaCaches.getCalculationsDependencies({ assessment, cycle, variableName, tableName })
  const data = await getTableData(
    {
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
    context.pushResult({ tableName, variableName, colName, value: node.value })
  }
}
