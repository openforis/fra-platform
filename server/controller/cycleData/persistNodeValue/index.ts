import { ActivityLogMessage, NodeValue, Row, VariableCache } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'
import { ColRepository } from '@server/repository/assessment/col'
import { RowRepository } from '@server/repository/assessment/row'

import { createOrUpdateNode } from './createOrUpdateNode'
import { evalExpression } from './evalExpression'
import { Props } from './props'

const evaluateNode = async (
  props: Props & { variableCache: VariableCache; expression: string; row: Row },
  client: BaseProtocol
): Promise<void> => {
  const { variableCache } = props
  const rawResult = await evalExpression(props, client)
  const value: NodeValue = { raw: rawResult ? String(rawResult) : null, calculated: true }

  // eslint-disable-next-line no-await-in-loop
  await createOrUpdateNode(
    {
      ...props,
      ...variableCache,
      value,
      activityLogMessage: ActivityLogMessage.nodeValueCalculatedUpdate,
    },
    client
  )
}

export const persistNodeValue = async (props: Props): Promise<void> => {
  const { assessment, tableName, variableName, colName } = props

  return DB.tx(async (client) => {
    await createOrUpdateNode(props, client)

    const queue: Array<VariableCache> = [
      ...(assessment.metaCache?.calculations.dependants[tableName]?.[variableName] ?? []),
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
          { assessment, tableName: variableCache.tableName, variableName: variableCache.variableName },
          client
        )
        const evaluateProps = {
          ...props,
          tableName: variableCache.tableName,
          variableName: variableCache.variableName,
          variableCache,
          row,
        }
        // eslint-disable-next-line no-await-in-loop
        const cols = await ColRepository.getMany({ assessment, rowId: row.id }, client)
        if (row.props.calculateFn) {
          // make sure in target table there's a matching column
          if (cols.find((c) => c.props.colName === colName)) {
            // eslint-disable-next-line no-await-in-loop
            await evaluateNode({ ...evaluateProps, expression: row.props.calculateFn }, client)
          }
        } else {
          // eslint-disable-next-line no-await-in-loop
          await Promise.all(
            cols.map(async (col) => {
              if (col.props.calculateFn) {
                await evaluateNode(
                  { ...evaluateProps, colName: col.props.colName, expression: col.props.calculateFn },
                  client
                )
              }
            })
          )
        }
        queue.push(
          ...(assessment.metaCache?.calculations.dependants[variableCache.tableName]?.[variableCache.variableName] ??
            [])
        )
        visitedVariables.push(variableCache)
      }
    }
  })
}
