import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { Sockets } from 'meta/socket'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { SocketServer } from 'server/service/socket'

import { updateOriginalDataPointDependentNodes } from './updateOriginalDataPointDependentNodes'

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
    const removedOriginalDataPoint = await OriginalDataPointRepository.remove(
      { assessment, cycle, originalDataPoint },
      t
    )

    const activityLog = {
      target: removedOriginalDataPoint,
      section: 'odp',
      message: ActivityLogMessage.originalDataPointRemove,
      countryIso,
      user,
    }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    const nodeUpdateEvent = Sockets.getODPDeleteEvent({ assessmentName, cycleName, countryIso })
    SocketServer.emit(nodeUpdateEvent, { countryIso, year: originalDataPoint.year })

    return removedOriginalDataPoint
  })

  await updateOriginalDataPointDependentNodes({ assessment, cycle, originalDataPoint, user, notifyClient: false })

  return odpReturn
}
