import { NodeValueValidation, NodeValueValidationMessage, Row, VariableCache } from '@meta/assessment'

import { evalExpression } from '@server/controller/cycleData/persistNodeValue/evalExpression/evalExpression'
import { Props } from '@server/controller/cycleData/persistNodeValue/props'
import { BaseProtocol } from '@server/db'
import { RowRepository } from '@server/repository/assessment/row'
import { NodeRepository } from '@server/repository/assessmentCycle/node'

export const evaluateNode = async (
  props: Props & { variableCache: VariableCache; expressions: Array<string>; row: Row },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, cycle, tableName, variableName, countryIso, colName, expressions } = props

  const dependencies = [{ tableName: 'extentOfForest', variableName: 'forestArea' }]
  const row = await RowRepository.getOne({ assessment, tableName, variableName }, client)
  const results: Array<NodeValueValidation> = await Promise.all(
    expressions.map((expression) => evalExpression({ ...props, row, expression, dependencies }, client))
  )

  const valid = results.every(({ valid }) => valid)
  const messages = results.reduce<Array<NodeValueValidationMessage>>(
    (messagesAcc, { messages = [] }) => [...messagesAcc, ...messages],
    []
  )
  const validation: NodeValueValidation = { valid, messages }

  await NodeRepository.updateValidation(
    { assessment, cycle, tableName, variableName, countryIso, colName, validation },
    client
  )
}
