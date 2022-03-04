import { ActivityLogMessage, NodeValue, VariableCache } from '@meta/assessment'
import { DB } from '@server/db'
import { Props } from './props'
import { createOrUpdateNode } from './createOrUpdateNode'
import { evalExpression } from './evalExpression'

export const persistNodeValue = async (props: Props): Promise<void> => {
  const { assessment, tableName, variableName } = props

  return DB.tx(async (client) => {
    await createOrUpdateNode(props, client)

    const queue: Array<VariableCache> = [
      ...(assessment.metaCache.calculations.dependants[tableName]?.[variableName] ?? []),
    ]
    const visitedVariables: Array<VariableCache> = [{ variableName, tableName }]

    while (queue.length !== 0) {
      const variableCache = queue.shift()
      if (
        visitedVariables.find(
          (v) => v.tableName === variableCache.tableName && v.variableName === variableCache.variableName
        )
      ) {
        throw new Error(
          `Circular dependency found ${tableName}.${variableName}->${variableCache.tableName}.${variableCache.variableName}`
        )
      }

      // eslint-disable-next-line no-await-in-loop
      const rawResult = await evalExpression({ ...props, ...variableCache }, client)
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
      queue.push(
        ...(assessment.metaCache.calculations.dependants[variableCache.tableName]?.[variableCache.variableName] ?? [])
      )
      visitedVariables.push(variableCache)
    }
  })
}
