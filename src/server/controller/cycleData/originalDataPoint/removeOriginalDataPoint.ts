import { Country } from 'meta/area'
import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Topics } from 'meta/messageCenter'
import { Sockets } from 'meta/socket'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { MessageTopicRepository } from 'server/repository/assessmentCycle/messageTopic'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { CountryService } from 'server/service/country'
import { SocketServer } from 'server/service/socket'

import { updateOriginalDataPointDependentNodes } from './updateDependants/updateOriginalDataPointDependentNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  originalDataPoint: OriginalDataPoint
  user: User
}

export const removeOriginalDataPoint = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, cycle, originalDataPoint, user, country } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { countryIso } = originalDataPoint

  const odpReturn = await client.tx(async (t) => {
    const target = await OriginalDataPointRepository.remove({ assessment, cycle, originalDataPoint }, t)
    const keyPrefix = Topics.getOdpReviewTopicKeyPrefix(originalDataPoint.id)
    await MessageTopicRepository.removeMany({ assessment, cycle, keyPrefix }, t)

    const message = ActivityLogMessage.originalDataPointRemove
    const activityLog: ActivityLog<OriginalDataPoint> = { target, section: 'odp', message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ assessment, cycle, activityLog }, t)

    const socketProps = { assessmentName, cycleName, countryIso }
    SocketServer.emit(Sockets.getODPDeleteEvent(socketProps), { countryIso, year: originalDataPoint.year })
    SocketServer.emit(Sockets.getRequestReviewSummaryEvent(socketProps))

    await CountryService.setCountryStatusEditing({ assessment, cycle, country, user }, t)

    return target
  })

  await updateOriginalDataPointDependentNodes({
    assessment,
    cycle,
    country,
    originalDataPoint,
    user,
    notifyClient: false,
  })

  return odpReturn
}
