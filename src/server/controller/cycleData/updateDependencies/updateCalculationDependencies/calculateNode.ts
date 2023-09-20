import { Objects } from 'utils/objects'

import { ColName, NodeValue, Row, TableName, VariableName } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { Context } from 'server/controller/cycleData/updateDependencies/context/context'

type Props = {
  context: Context
  // sectionName: SectionName
  tableName: TableName
  variableName: VariableName
  row: Row
  colName: ColName
  formula: string
  // mergeOdp: boolean
  // user: User
}

export const calculateNode = (props: Props): void => {
  const { context, colName, formula, tableName, variableName, row } = props
  const { assessment, cycle, countryIso, data } = context
  // const dependencies = AssessmentMetaCaches.getCalculationsDependencies({ assessment, cycle, variableName, tableName })
  // const data = await getTableData(
  //   {
  //     columns: [],
  //     mergeOdp,
  //     tableNames: [tableName],
  //     variables: [],
  //     assessment,
  //     cycle,
  //     countryISOs: [countryIso],
  //     dependencies,
  //   },
  //   client
  // )

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

    // TODO
    // const activityLogMessage = ActivityLogMessage.nodeValueCalculatedUpdate
    // const node = await persistNode(
    //   { countryIso, assessment, cycle, sectionName, tableName, variableName, colName, user, value, activityLogMessage },
    //   client
    // )
    context.pushResult({ tableName, variableName, colName, value })
  }
}
