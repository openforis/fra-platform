import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { Sockets } from 'meta/socket'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { SocketServer } from 'server/service/socket'

import { updateOriginalDataPointDependentNodes } from './updateOriginalDataPointDependentNodes'

export const removeOriginalDataPoint = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    originalDataPoint: OriginalDataPoint
    user: User
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, originalDataPoint, user } = props

  return client.tx(async (t) => {
    const removedOriginalDataPoint = await OriginalDataPointRepository.remove({ assessment, cycle, originalDataPoint }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: removedOriginalDataPoint,
          section: 'odp',
          message: ActivityLogMessage.originalDataPointRemove,
          countryIso: originalDataPoint.countryIso,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    await updateOriginalDataPointDependentNodes({ assessment, cycle, originalDataPoint, user }, t)

    const nodeUpdateEvent = Sockets.getODPDeleteEvent({
      assessmentName: assessment.props.name,
      cycleName: cycle.name,
      countryIso: originalDataPoint.countryIso,
    })
    SocketServer.emit(nodeUpdateEvent, { countryIso: originalDataPoint.countryIso, year: originalDataPoint.year })

    return removedOriginalDataPoint
  })
}
