import { NodeValueValidation, NodeValueValidations, Row } from '@meta/assessment'
import { TableData } from '@meta/data'

import { getTableData } from '@server/controller/cycleData/getTableData'
import { PersistNodeValueProps } from '@server/controller/cycleData/persistNodeValues/props'
import { ExpressionEvaluator } from '@server/controller/cycleData/updateDependencies/expressionEvaluator'
import { BaseProtocol } from '@server/db'

export const validateNode = async (
  props: Omit<PersistNodeValueProps, 'value' | 'user'> & { row: Row; data?: TableData },
  client: BaseProtocol
): Promise<NodeValueValidation> => {
  const { assessment, cycle, tableName, variableName, countryIso, colName, row, data: dataProps } = props

  const dependencies = assessment.metaCache[cycle.uuid].validations.dependencies[tableName]?.[variableName]
  const data =
    dataProps ??
    (await getTableData(
      {
        aggregate: false,
        columns: [],
        mergeOdp: true,
        variables: [],
        assessment,
        cycle,
        countryISOs: [countryIso],
        tableNames: [],
        dependencies,
      },
      client
    ))

  const validations = row.props.validateFns?.[cycle.uuid]?.map((expression) =>
    ExpressionEvaluator.evalFormula<NodeValueValidation>({
      assessment,
      countryIso,
      cycle,
      data,
      colName,
      row,
      formula: expression,
    })
  )

  return NodeValueValidations.merge(validations)
}
