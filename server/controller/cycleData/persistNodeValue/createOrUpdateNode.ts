import { ActivityLog, ActivityLogMessage, Node } from '@meta/assessment'
import { BaseProtocol, Schemas } from '@server/db'
import { NodeRepository } from '@server/repository/node'
import { ActivityLogRepository } from '@server/repository'
import { Props } from './props'

export const createOrUpdateNode = async (
  props: Props & { activityLogMessage?: ActivityLogMessage },
  client: BaseProtocol
): Promise<Node> => {
  const { assessment, countryIso, activityLogMessage, user } = props
  const schemaName = Schemas.getName(assessment)
  const node: Node = await NodeRepository.getOneOrNone(props, client)

  const nodeUpdated = await (node ? NodeRepository.update(props, client) : NodeRepository.create(props, client))
  const activityLog: ActivityLog<Node> = {
    countryIso,
    message: activityLogMessage ?? ActivityLogMessage.nodeValueUpdate,
    section: 'node',
    target: nodeUpdated,
    user,
  }
  await ActivityLogRepository.insertActivityLog({ schemaName, activityLog }, client)
  return nodeUpdated
}
