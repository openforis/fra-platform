import { NodeValue, Row, VariableCache } from '@meta/assessment'
import { NodeUpdate, NodeUpdates } from '@meta/data'

import { BaseProtocol } from '@server/db'
import { RowRepository } from '@server/repository/assessment/row'
import { NodeRepository } from '@server/repository/assessmentCycle/node'

import { validateNode } from './validateNode'

type Props = {
  nodeUpdates: NodeUpdates
}

type QueueItem = Omit<NodeUpdate, 'value'> & { value?: NodeValue }

export const validateNodeUpdates = async (props: Props, client: BaseProtocol): Promise<NodeUpdates> => {
  const { nodeUpdates } = props
  const { assessment, cycle, countryIso, nodes } = nodeUpdates

  const queue: Array<QueueItem> = [...nodes]
  const visitedVariables: Array<VariableCache> = []
  const nodeUpdatesResult: NodeUpdates = { assessment, cycle, countryIso, nodes: [] }

  while (queue.length !== 0) {
    const queueItem = queue.shift()
    const { variableName, tableName, colName, value: nodeValue } = queueItem
    // console.log('==== validating ', countryIso, tableName, variableName, colName)
    const visited = visitedVariables.find(
      (v) => v.tableName === tableName && v.variableName === variableName && v.colName === colName
    )
    // if (visited) {
    // throw new Error(
    //   `Circular dependency found ${tableName}.${variableName}->${variableCache.tableName}.${variableCache.variableName}`
    // )
    // continue
    // console.log('------ variable visited ', variableCache)
    // }

    if (!visited) {
      let value: NodeValue = nodeValue
      // eslint-disable-next-line no-await-in-loop
      const row: Row = await RowRepository.getOne({ assessment, tableName, variableName, includeCols: true }, client)
      if (row.props.validateFns) {
        // make sure in target table there's a matching column
        if (row.cols.find((c) => c.props.colName === colName)) {
          // eslint-disable-next-line no-await-in-loop
          const validation = await validateNode(
            { assessment, cycle, countryIso, tableName, variableName, colName, row },
            client
          )
          // eslint-disable-next-line no-await-in-loop
          const node = await NodeRepository.updateValidation(
            { assessment, cycle, tableName, variableName, countryIso, colName, validation },
            client
          )
          value = node?.value
        }
      }

      const dependants = (assessment.metaCache.validations.dependants[tableName]?.[variableName] ?? []).map(
        ({ tableName, variableName }) => ({ tableName, variableName, colName })
      )
      queue.push(...dependants)
      visitedVariables.push(queueItem)
      if (value) {
        nodeUpdatesResult.nodes.push({ tableName, variableName, colName, value })
      }
    }
  }

  return nodeUpdatesResult
}
