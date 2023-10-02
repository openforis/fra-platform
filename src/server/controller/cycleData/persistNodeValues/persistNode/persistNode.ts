import { CountryIso } from 'meta/area'
import { ActivityLog, ActivityLogMessage, Assessment, Cycle, Node } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'
import { User } from 'meta/user'

import { BaseProtocol } from 'server/db'
import { NodeRepository } from 'server/repository/assessmentCycle/node'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { DataRedisRepository } from 'server/repository/redis/data'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName?: string
  user: User
  activityLogMessage?: ActivityLogMessage
} & NodeUpdate

export const persistNode = async (props: Props, client: BaseProtocol): Promise<Node> => {
  const { assessment, countryIso, activityLogMessage, user, cycle, sectionName } = props
  const node: Node = await NodeRepository.getOneOrNone(props, client)

  const [nodeUpdated] = await Promise.all([
    node ? NodeRepository.update(props, client) : NodeRepository.create(props, client),
    DataRedisRepository.updateNode(props),
  ])
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
