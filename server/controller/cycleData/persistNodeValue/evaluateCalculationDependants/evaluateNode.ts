import { ActivityLogMessage, NodeValue, Row, VariableCache } from '@meta/assessment'

import { createOrUpdateNode } from '@server/controller/cycleData/persistNodeValue/createOrUpdateNode'
import { evalExpression } from '@server/controller/cycleData/persistNodeValue/evalExpression'
import { Props } from '@server/controller/cycleData/persistNodeValue/props'
import { BaseProtocol } from '@server/db'

export const evaluateNode = async (
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
