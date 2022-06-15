import { Node, NodeValueValidation, NodeValueValidations, Row } from '@meta/assessment'
import { TableData } from '@meta/data'

import { evalExpression } from '@server/controller/cycleData/persistNodeValue/evalExpression/evalExpression'
import { Props } from '@server/controller/cycleData/persistNodeValue/props'
import { BaseProtocol } from '@server/db'
import { NodeRepository } from '@server/repository/assessmentCycle/node'

export const validateNode = async (
  props: Omit<Props, 'value' | 'user'> & { row: Row; data?: TableData },
  client: BaseProtocol
): Promise<Node> => {
  const { assessment, cycle, tableName, variableName, countryIso, colName, row, data } = props

  const dependencies = assessment.metaCache.validations.dependencies[tableName]?.[variableName]
  const validations = await Promise.all(
    row.props.validateFns.map((expression) =>
      evalExpression<NodeValueValidation>(
        { countryIso, assessment, tableName, variableName, colName, cycle, row, expression, dependencies, data },
        client
      )
    )
  )

  const validation = NodeValueValidations.merge(validations)

  return NodeRepository.updateValidation(
    { assessment, cycle, tableName, variableName, countryIso, colName, validation },
    client
  )
}
