import { Row, VariableCache } from '@meta/assessment'
import { NodeUpdates } from '@meta/data'

import { Props } from '@server/controller/cycleData/persistNodeValue/props'
import { BaseProtocol } from '@server/db'
import { RowRepository } from '@server/repository/assessment/row'

import { calculateNode } from './calculateNode'

export const calculateDependantNodes = async (props: Props, client: BaseProtocol): Promise<NodeUpdates> => {
  const { assessment, cycle, countryIso, tableName, variableName, colName, user } = props

  const nodeUpdates: NodeUpdates = { assessment, cycle, countryIso, values: [] }
  const queue: Array<VariableCache> = [
    ...(assessment.metaCache.calculations.dependants[tableName]?.[variableName] ?? []),
  ]
  const visitedVariables: Array<VariableCache> = [{ variableName, tableName }]

  while (queue.length !== 0) {
    const variableCache = queue.shift()
    const visited = visitedVariables.find(
      (v) => v.tableName === variableCache.tableName && v.variableName === variableCache.variableName
    )
    // if (visited) {
    // throw new Error(
    //   `Circular dependency found ${tableName}.${variableName}->${variableCache.tableName}.${variableCache.variableName}`
    // )
    // continue
    //   console.log('------ variable visited ', variableCache)
    // }

    if (!visited) {
      // eslint-disable-next-line no-await-in-loop
      const row: Row = await RowRepository.getOne(
        { assessment, tableName: variableCache.tableName, variableName: variableCache.variableName, includeCols: true },
        client
      )
      const evaluateProps = {
        countryIso,
        assessment,
        cycle,
        colName,
        expression: row.props.calculateFn,
        row,
        tableName: variableCache.tableName,
        variableName: variableCache.variableName,
        user,
      }

      if (row.props.calculateFn) {
        // make sure in target table there's a matching column
        if (row.cols.find((c) => c.props.colName === colName)) {
          // eslint-disable-next-line no-await-in-loop
          const node = await calculateNode({ ...evaluateProps, expression: row.props.calculateFn }, client)
          nodeUpdates.values.push({
            tableName: evaluateProps.tableName,
            variableName: evaluateProps.variableName,
            colName: evaluateProps.colName,
            value: node.value,
          })
        }
      } else {
        // eslint-disable-next-line no-await-in-loop
        await Promise.all(
          row.cols.map(async (col) => {
            if (col.props.calculateFn) {
              const node = await calculateNode(
                { ...evaluateProps, colName: col.props.colName, expression: col.props.calculateFn },
                client
              )
              nodeUpdates.values.push({
                tableName: evaluateProps.tableName,
                variableName: evaluateProps.variableName,
                colName: evaluateProps.colName,
                value: node.value,
              })
            }
          })
        )
      }
      queue.push(
        ...(assessment.metaCache.calculations.dependants[variableCache.tableName]?.[variableCache.variableName] ?? [])
      )
      visitedVariables.push(variableCache)
    }
  }

  return nodeUpdates
}
