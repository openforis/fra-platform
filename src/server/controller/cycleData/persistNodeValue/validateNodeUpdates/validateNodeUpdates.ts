import { NodeValue, Row, TableNames } from '@meta/assessment'
import { NodeUpdate, NodeUpdates } from '@meta/data'

import { BaseProtocol } from '@server/db'
import { RowRepository } from '@server/repository/assessment/row'
import { getOriginalDataPointNode } from '@server/repository/assessmentCycle/data/getOriginalDataPointNode'
import { NodeRepository } from '@server/repository/assessmentCycle/node'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'

import { validateNode } from './validateNode'

type Props = {
  nodeUpdates: NodeUpdates
}

type QueueItem = Omit<NodeUpdate, 'value'> & { value?: NodeValue }

export const validateNodeUpdates = async (props: Props, client: BaseProtocol): Promise<NodeUpdates> => {
  const { nodeUpdates } = props
  const { assessment, cycle, countryIso, nodes } = nodeUpdates

  const queue: Array<QueueItem> = [...nodes]
  const visitedVariables: Array<QueueItem> = []
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
      if (row.props.validateFns?.[cycle.uuid]) {
        // make sure in target table there's a matching column
        if (row.cols.find((c) => c.props.colName === colName)) {
          let isODPNode = false

          // If we are handling tables 1a or 1b
          if ([TableNames.extentOfForest, TableNames.forestCharacteristics].includes(tableName as TableNames)) {
            // eslint-disable-next-line no-await-in-loop
            const ODPYears = await OriginalDataPointRepository.getReservedYears(
              { assessment, cycle, countryIso },
              client
            )

            // We are on odp node if there is a year for current colName
            isODPNode = ODPYears.map(String).includes(colName)
          }

          if (isODPNode) {
            // Fetch the corresponding ODP value for the node update (used to update tables over websocket)
            // eslint-disable-next-line no-await-in-loop
            value = await getOriginalDataPointNode(
              {
                assessment,
                cycle,
                countryIso,
                colName,
                variableName,
              },
              client
            )
          } else {
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
      }

      const dependants = (assessment.metaCache[cycle.uuid].validations.dependants[tableName]?.[variableName] ?? []).map(
        ({ tableName, variableName }) => ({ tableName, variableName, colName })
      )
      queue.push(...dependants)
      visitedVariables.push(queueItem)
      if (value) {
        nodeUpdatesResult.nodes.push({
          // Assign correct table name if value is ODP value
          tableName: value.odp ? TableNames.originalDataPointValue : tableName,
          variableName,
          colName,
          value,
        })
      }
    }
  }

  return nodeUpdatesResult
}
