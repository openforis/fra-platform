import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { ActivityLogNodeValue } from 'meta/assessment/activityLog/tableData'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Node } from 'meta/assessment/node'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { User } from 'meta/user/user'

import { BaseProtocol } from 'server/db/db'
import { NodeRepository } from 'server/db/repository/assessmentCycle/node'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName?: string
  user: User
  activityLogMessage?: ActivityLogNodeValue['message']
} & NodeUpdate

export const persistNode = async (props: Props, client: BaseProtocol): Promise<{ node: Node; time: string }> => {
  const { activityLogMessage, assessment, countryIso, cycle, sectionName, user } = props
  const node: Node = await NodeRepository.getOneOrNone(props, client)

  const nodeUpdated = await (node ? NodeRepository.update(props, client) : NodeRepository.create(props, client))

  const activityLog: ActivityLogNodeValue = {
    countryIso,
    message: activityLogMessage ?? ActivityLogMessage.nodeValueUpdate,
    section: sectionName,
    target: nodeUpdated,
    user,
  }
  const { time } = await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, client)
  return { node: nodeUpdated, time }
}
