import { NodeValueValidation, NodeValueValidations, Row } from '@meta/assessment'

import { evalExpression } from '@server/controller/cycleData/persistNodeValue/evalExpression/evalExpression'
import { Props } from '@server/controller/cycleData/persistNodeValue/props'
import { BaseProtocol } from '@server/db'
import { NodeRepository } from '@server/repository/assessmentCycle/node'

export const validateNode = async (props: Omit<Props, 'value'> & { row: Row }, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle, tableName, variableName, countryIso, colName, row } = props

  const dependencies = assessment.metaCache.validations.dependencies[tableName]?.[variableName]
  const validations = await Promise.all(
    row.props.validateFns.map((expression) =>
      evalExpression<NodeValueValidation>(
        { countryIso, assessment, tableName, variableName, colName, cycle, row, expression, dependencies },
        client
      )
    )
  )

  const validation = NodeValueValidations.merge(validations)

  await NodeRepository.updateValidation(
    { assessment, cycle, tableName, variableName, countryIso, colName, validation },
    client
  )
}
