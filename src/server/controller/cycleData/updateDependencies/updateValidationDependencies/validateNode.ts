import { AssessmentMetaCaches, NodeValueValidation, NodeValueValidations, Row } from '@meta/assessment'
import { TableData } from '@meta/data'

import { getTableData } from '@server/controller/cycleData/getTableData'
import { PersistNodeValueProps } from '@server/controller/cycleData/persistNodeValues/props'
import { ExpressionEvaluator } from '@server/controller/cycleData/updateDependencies/expressionEvaluator'
import { BaseProtocol } from '@server/db'

export const validateNode = async (
  props: Omit<PersistNodeValueProps, 'value' | 'user'> & { row: Row; data?: TableData; validateFns: string[] },
  client: BaseProtocol
): Promise<NodeValueValidation> => {
  const { assessment, colName, countryIso, cycle, data: dataProps, row, tableName, variableName, validateFns } = props
  const dependencies = AssessmentMetaCaches.getValidationsDependencies({ assessment, cycle, tableName, variableName })

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

  const validations = validateFns.map((expression) => {
    return ExpressionEvaluator.evalFormula<NodeValueValidation>({
      assessment,
      countryIso,
      cycle,
      data,
      colName,
      row,
      formula: expression,
    })
  })

  return NodeValueValidations.merge(validations)
}
