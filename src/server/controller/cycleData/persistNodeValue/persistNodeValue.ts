import { ActivityLogMessage } from '@meta/assessment'
import { NodeUpdates } from '@meta/data'
import { Sockets } from '@meta/socket'

import { calculateAndValidateDependentNodes } from '@server/controller/cycleData/persistNodeValue/calculateAndValidateDependentNodes'
import { DB } from '@server/db'
import { SocketServer } from '@server/service/socket'

import { persistNode } from './persistNode/persistNode'
import { Props } from './props'

export const persistNodeValue = async (props: Props & { activityLogMessage?: ActivityLogMessage }): Promise<void> => {
  const { assessment, colName, countryIso, cycle, tableName, variableName, sectionName } = props

  return DB.tx(async (client) => {
    try {
      await client.func('pg_advisory_xact_lock', [1])

      const node = await persistNode(props, client)

      const nodeUpdates: NodeUpdates = {
        assessment,
        countryIso,
        cycle,
        nodes: [{ tableName, variableName, colName, value: node.value }],
      }

      const calculatedAndValidatedNodes = await calculateAndValidateDependentNodes({ ...props, nodeUpdates }, client)

      const propsEvent = {
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        sectionName,
      }

      const nodeUpdateEvent = Sockets.getAssessmentSectionUpdateEvent(propsEvent)
      SocketServer.emit(nodeUpdateEvent, {
        ...propsEvent,
        // TODO: Fix calculateAndValidatedependantNodes return value
        calculations: calculatedAndValidatedNodes.nodeUpdates.nodes,
        validations: calculatedAndValidatedNodes.nodeUpdatesValidation.nodes,
      })
    } finally {
      await client.func('pg_advisory_xact_lock', [1])
    }
  })
}
