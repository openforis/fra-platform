import { NodeValue, Row, TableNames } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { BaseProtocol } from 'server/db'
import { RowRepository } from 'server/repository/assessment/row'
import { NodeRepository } from 'server/repository/assessmentCycle/node'

import { getDependants } from '../utils/getDependants'
import { validateNode } from './validateNode'

type Props = {
  nodeUpdates: NodeUpdates
  isODP: boolean
}

type QueueItem = Omit<NodeUpdate, 'value'> & { value?: NodeValue }

export const updateValidationDependencies = async (props: Props, client: BaseProtocol): Promise<NodeUpdates> => {
  const { nodeUpdates, isODP } = props
  const { assessment, cycle, countryIso, nodes } = nodeUpdates

  const queue: Array<QueueItem> = [...nodes]
  const visitedVariables: Array<QueueItem> = []
  const nodeUpdatesResult: NodeUpdates = { assessment, cycle, countryIso, nodes: [] }

  while (queue.length !== 0) {
    const queueItem = queue.shift()
    const { variableName, tableName, colName } = queueItem
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
      // eslint-disable-next-line no-await-in-loop
      const row: Row = await RowRepository.getOne({ assessment, tableName, variableName, includeCols: true }, client)
      if (row.props.validateFns?.[cycle.uuid]) {
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
              validateFns: row.props.validateFns?.[cycle.uuid],
            },
            client
          )
          // eslint-disable-next-line no-await-in-loop
          const node = await NodeRepository.updateValidation(
            { assessment, cycle, tableName, variableName, countryIso, colName, validation },
            client
          )
          const value: NodeValue = node?.value
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
      } else {
        const col = row.cols.find((col) => col.props.colName === colName)
        if (col.props.validateFns?.[cycle.uuid]) {
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
              validateFns: col.props.validateFns[cycle.uuid],
            },
            client
          )

          // eslint-disable-next-line no-await-in-loop
          const node = await NodeRepository.updateValidation(
            { assessment, cycle, tableName, variableName, countryIso, colName, validation },
            client
          )

          const value = node?.value
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

      // eslint-disable-next-line no-await-in-loop
      const variableCaches = await getDependants(
        { tableName, variableName, assessment, cycle, colName, countryIso, isODP, type: 'validations' },
        client
      )

      const dependants = variableCaches.map<QueueItem>(({ tableName, variableName }) => ({
        tableName,
        variableName,
        colName,
      }))
      queue.push(...dependants)
      visitedVariables.push(queueItem)
    }
  }

  return nodeUpdatesResult
}
