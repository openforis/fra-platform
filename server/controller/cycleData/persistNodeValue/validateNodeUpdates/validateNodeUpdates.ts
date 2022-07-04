import { Row, VariableCache } from '@meta/assessment'
import { NodeUpdates } from '@meta/data'

import { BaseProtocol } from '@server/db'
import { RowRepository } from '@server/repository/assessment/row'
import { NodeRepository } from '@server/repository/assessmentCycle/node'

import { validateNode } from './validateNode'

type Props = {
  nodeUpdates: NodeUpdates
}

type QueueItem = VariableCache & { colName: string }

export const validateNodeUpdates = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { nodeUpdates } = props

  const { assessment, cycle, countryIso, nodes } = nodeUpdates
  const queue = nodes.map<QueueItem>(({ tableName, variableName, colName }) => ({ tableName, variableName, colName }))
  const visitedVariables: Array<VariableCache> = []

  while (queue.length !== 0) {
    const variableCache = queue.shift()
    const { variableName, tableName, colName } = variableCache
    // console.log('==== validating ', countryIso, tableName, variableName, colName)
    const visited = visitedVariables.find((v) => v.tableName === tableName && v.variableName === variableName)
    // if (visited) {
    // throw new Error(
    //   `Circular dependency found ${tableName}.${variableName}->${variableCache.tableName}.${variableCache.variableName}`
    // )
    // continue
    // console.log('------ variable visited ', variableCache)
    // }

    if (!visited) {
      // eslint-disable-next-line no-await-in-loop
      const row: Row = await RowRepository.getOne({ assessment, tableName, variableName, includeCols: true }, client)
      if (row.props.validateFns) {
        // make sure in target table there's a matching column
        if (row.cols.find((c) => c.props.colName === colName)) {
          // eslint-disable-next-line no-await-in-loop
          const validation = await validateNode(
            {
              assessment,
              cycle,
              countryIso,
              tableName,
              variableName,
              colName,
              row,
            },
            client
          )
          // eslint-disable-next-line no-await-in-loop
          await NodeRepository.updateValidation(
            { assessment, cycle, tableName, variableName, countryIso, colName, validation },
            client
          )
        }
      }

      const dependants = (assessment.metaCache.validations.dependants[tableName]?.[variableName] ?? []).map(
        ({ tableName, variableName }) => ({ tableName, variableName, colName })
      )
      queue.push(...dependants)

      visitedVariables.push(variableCache)
    }
  }
}
