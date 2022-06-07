import { ActivityLogMessage, NodeValue, Row, VariableCache } from '@meta/assessment'

import { evalExpression } from '@server/controller/cycleData/persistNodeValue/evalExpression/evalExpression'
import { persistNode } from '@server/controller/cycleData/persistNodeValue/persistNode/persistNode'
import { Props } from '@server/controller/cycleData/persistNodeValue/props'
import { BaseProtocol } from '@server/db'

export const evaluateNode = async (
  props: Props & { variableCache: VariableCache; expression: string; row: Row },
  client: BaseProtocol
): Promise<void> => {
  const { variableCache, assessment, tableName, variableName } = props
  const dependencies = assessment.metaCache.calculations.dependencies[tableName]?.[variableName]
  const rawResult = await evalExpression({ ...props, dependencies }, client)
  const value: NodeValue = { raw: rawResult ? String(rawResult) : null, calculated: true }

  // eslint-disable-next-line no-await-in-loop
  await persistNode(
    {
      ...props,
      ...variableCache,
      value,
      activityLogMessage: ActivityLogMessage.nodeValueCalculatedUpdate,
    },
    client
  )
}
