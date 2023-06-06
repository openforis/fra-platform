import { ActivityLog, ActivityLogMessage, Node } from 'meta/assessment'

import { BaseProtocol } from 'server/db'
import { NodeRepository } from 'server/repository/assessmentCycle/node'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

import { PersistNodeValueProps } from '../props'

export const persistNode = async (
  props: PersistNodeValueProps & { activityLogMessage?: ActivityLogMessage },
  client: BaseProtocol
): Promise<Node> => {
  const { assessment, countryIso, activityLogMessage, user, cycle, sectionName } = props
  const node: Node = await NodeRepository.getOneOrNone(props, client)

  const nodeUpdated = await (node ? NodeRepository.update(props, client) : NodeRepository.create(props, client))
  const activityLog: ActivityLog<Node> = {
    countryIso,
    message: activityLogMessage ?? ActivityLogMessage.nodeValueUpdate,
    section: sectionName,
    target: nodeUpdated,
    user,
  }
  await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, client)
  return nodeUpdated
}
