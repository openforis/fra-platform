import { ActivityLog, ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { Sockets } from 'meta/socket'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { MessageTopicRepository } from 'server/repository/assessmentCycle/messageTopic'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { SocketServer } from 'server/service/socket'

import { updateOriginalDataPointDependentNodes } from './updateDependants/updateOriginalDataPointDependentNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  originalDataPoint: OriginalDataPoint
  user: User
}

export const removeOriginalDataPoint = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, cycle, originalDataPoint, user } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { countryIso } = originalDataPoint

  const odpReturn = await client.tx(async (t) => {
    const target = await OriginalDataPointRepository.remove({ assessment, cycle, originalDataPoint }, t)
    await MessageTopicRepository.removeOriginalDataPointTopics({ assessment, cycle, odpId: originalDataPoint.id }, t)

    const message = ActivityLogMessage.originalDataPointRemove
    const activityLog: ActivityLog<OriginalDataPoint> = { target, section: 'odp', message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ assessment, cycle, activityLog }, t)

    const socketProps = { assessmentName, cycleName, countryIso }
    SocketServer.emit(Sockets.getODPDeleteEvent(socketProps), { countryIso, year: originalDataPoint.year })
    SocketServer.emit(Sockets.getRequestReviewSummaryEvent(socketProps))

    return target
  })

  await updateOriginalDataPointDependentNodes({ assessment, cycle, originalDataPoint, user, notifyClient: false })

  return odpReturn
}
