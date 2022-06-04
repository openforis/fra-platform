import { NodeValueValidation, NodeValueValidations, Row, VariableCache } from '@meta/assessment'

import { evalExpression } from '@server/controller/cycleData/persistNodeValue/evalExpression/evalExpression'
import { Props } from '@server/controller/cycleData/persistNodeValue/props'
import { BaseProtocol } from '@server/db'
import { NodeRepository } from '@server/repository/assessmentCycle/node'

export const evaluateNode = async (
  props: Props & { variableCache: VariableCache; expressions: Array<string>; row: Row },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, cycle, tableName, variableName, countryIso, colName, row, expressions } = props

  const dependencies = [
    { tableName: 'extentOfForest', variableName: 'forestArea' },
    { tableName: 'extentOfForest', variableName: 'otherLand' },
    { tableName: 'extentOfForest', variableName: 'totalLandArea' },
  ]
  const validations = await Promise.all(
    expressions.map((expression) =>
      evalExpression<NodeValueValidation>({ ...props, row, expression, dependencies }, client)
    )
  )

  const validation = NodeValueValidations.merge(validations)

  await NodeRepository.updateValidation(
    { assessment, cycle, tableName, variableName, countryIso, colName, validation },
    client
  )
}
