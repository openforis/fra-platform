import { NodeValueValidation, NodeValueValidations, Row } from '@meta/assessment'
import { TableData } from '@meta/data'

import { ExpressionEvaluator } from '@server/controller/cycleData/persistNodeValue/expressionEvaluator'
import { Props } from '@server/controller/cycleData/persistNodeValue/props'
import { BaseProtocol } from '@server/db'
import { DataRepository } from '@server/repository/assessmentCycle/data'

export const validateNode = async (
  props: Omit<Props, 'value' | 'user'> & { row: Row; data?: TableData },
  client: BaseProtocol
): Promise<NodeValueValidation> => {
  const { assessment, cycle, tableName, variableName, countryIso, colName, row, data: dataProps } = props

  const dependencies = assessment.metaCache.validations.dependencies[tableName]?.[variableName]
  const data =
    dataProps ??
    (await DataRepository.getTableData(
      { assessment, cycle, countryISOs: [countryIso], tables: {}, dependencies },
      client
    ))

  const validations = row.props.validateFns.map((expression) =>
    ExpressionEvaluator.evalFormula<NodeValueValidation>({
      assessment,
      countryIso,
      data,
      colName,
      row,
      formula: expression,
    })
  )

  return NodeValueValidations.merge(validations)
}
