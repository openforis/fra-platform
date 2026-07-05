import { Country } from 'meta/area/country'
import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { Topics } from 'meta/messageCenter/topics'
import { Sockets } from 'meta/socket/sockets'
import { User } from 'meta/user/user'

import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { notifyNationalDataPointValidationDelete } from 'server/controller/cycleData/validations/nationalDataPoint/notifyNationalDataPointValidationDelete'
import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { MessageTopicRepository } from 'server/db/repository/assessmentCycle/messageTopic'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
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

const name = CommentableDescriptionName.dataSources
const sectionName = SectionNames.nationalDataPoint

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, country, cycle, originalDataPoint, user } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { countryIso, uuid } = originalDataPoint

  const target = await client.tx(async (t) => {
    const [target] = await Promise.all([
      OriginalDataPointRepository.remove({ assessment, cycle, originalDataPoint }, t),
      DescriptionRepository.remove(
        { assessment, countryIso, cycle, name, sectionName, sectionUuid: originalDataPoint.uuid },
        t
      ),
    ])

    const keyPrefix = Topics.getOdpReviewTopicKeyPrefix(originalDataPoint.id)
    await MessageTopicRepository.removeMany({ assessment, cycle, keyPrefix }, t)

    const message = ActivityLogMessage.originalDataPointRemove
    const activityLog: ActivityLog<OriginalDataPoint> = { target, section: 'odp', message, countryIso, user }
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { assessment, cycle, activityLog },
      t
    )

    const socketProps = { assessmentName, cycleName, countryIso }
    SocketServer.emit(Sockets.getODPDeleteEvent(socketProps), { countryIso, year: originalDataPoint.year })
    SocketServer.emit(Sockets.getRequestReviewSummaryEvent(socketProps))

    await CountryService.updateLastEdit({ assessment, cycle, country, user, lastEditOdp: true, lastUpdateTimestamp }, t)

    await updateOriginalDataPointDependentNodes(
      {
        assessment,
        cycle,
        country,
        originalDataPoint,
        user,
        notifyClient: false,
      },
      t
    )

    return target
  })

  await NationalDataPointValidationRedisRepository.deleteValidations({
    assessment,
    countryIso,
    cycle,
    uuids: [uuid],
  })
  notifyNationalDataPointValidationDelete({ assessment, countryIso, cycle, uuid })

  return target
}
