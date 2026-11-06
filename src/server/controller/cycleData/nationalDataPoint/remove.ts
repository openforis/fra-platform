import { Country } from 'meta/area/country'
import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { NDPLinkFields } from 'meta/cycleData/links/nationalDataPointLink'
import { Topics } from 'meta/messageCenter/topics'
import { Sockets } from 'meta/socket/sockets'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { MessageTopicRepository } from 'server/db/repository/assessmentCycle/messageTopic'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { CountryService } from 'server/service/country'
import { DataValidationService } from 'server/service/dataValidation'
import { LinksService } from 'server/service/links'
import { SocketServer } from 'server/service/socket'
import { ProcessEnv } from 'server/utils'
import { NodeEnv } from 'server/utils/processEnv'

import { updateOriginalDataPointDependentNodes } from './updateDependants/updateOriginalDataPointDependentNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  originalDataPoint: OriginalDataPoint
  socketId?: string
  user: User
}

const name = CommentableDescriptionName.dataSources
const sectionName = SectionNames.nationalDataPoint

export const remove = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Pick<OriginalDataPoint, 'uuid' | 'year'>> => {
  const { assessment, country, cycle, originalDataPoint, socketId, user } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { countryIso, uuid } = originalDataPoint

  const deletedNationalDataPoint = await client.tx(async (t) => {
    const [deletedNationalDataPoint] = await Promise.all([
      OriginalDataPointRepository.remove({ assessment, cycle, originalDataPoint }, t),
      DescriptionRepository.remove(
        { assessment, countryIso, cycle, name, sectionName, sectionUuid: originalDataPoint.uuid },
        t
      ),
    ])

    const keyPrefix = Topics.getOdpReviewTopicKeyPrefix(originalDataPoint.id)
    await MessageTopicRepository.removeMany({ assessment, cycle, keyPrefix }, t)

    const message = ActivityLogMessage.originalDataPointRemove
    const activityLog: ActivityLog<Pick<OriginalDataPoint, 'uuid' | 'year'>> = {
      target: deletedNationalDataPoint,
      section: 'odp',
      message,
      countryIso,
      user,
    }
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { assessment, cycle, activityLog },
      t
    )

    const socketProps = { assessmentName, cycleName, countryIso }
    SocketServer.emit(Sockets.getODPDeleteEvent(socketProps), { countryIso, year: originalDataPoint.year })
    SocketServer.emit(Sockets.getRequestReviewSummaryEvent(socketProps))

    await CountryService.updateLastEdit({ assessment, cycle, country, user, lastEditOdp: true, lastUpdateTimestamp }, t)

    if (ProcessEnv.nodeEnv !== NodeEnv.test) {
      await updateOriginalDataPointDependentNodes(
        {
          assessment,
          cycle,
          country,
          originalDataPoint,
          user,
        },
        t
      )
    }

    return deletedNationalDataPoint
  })

  const eventName = Sockets.getNationalDataPointDeleteEvent({ uuid })
  SocketServer.emitExcept({ eventName, socketId }, { year: originalDataPoint.year })

  await DataValidationService.removeNDPValidation({ assessment, countryIso, cycle, uuid })

  // Remove the deleted national data point's link locations.
  // Clients are already notified through the delete event above.
  await LinksService.enqueueNationalDataPointLinksValidation({
    assessment,
    countryIso,
    cycle,
    notifyClients: false,
    targets: [{ ndpUuid: uuid, fields: NDPLinkFields }],
  })

  return deletedNationalDataPoint
}
