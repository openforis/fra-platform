import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  originalDataPoint: OriginalDataPoint
  user: User
}

export const createOriginalDataPoint = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, cycle, originalDataPoint, user } = props

  return client.tx(async (t) => {
    const createdOriginalDataPoint = await OriginalDataPointRepository.create(
      { assessment, cycle, originalDataPoint },
      t
    )

    const activityLog = {
      target: createdOriginalDataPoint,
      section: 'odp',
      message: ActivityLogMessage.originalDataPointCreate,
      countryIso: originalDataPoint.countryIso,
      user,
    }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    // TODO:
    // await updateOriginalDataPointDependentNodes(
    //   { assessment, cycle, sectionName, originalDataPoint: createdOriginalDataPoint, user },
    //   t
    // )

    return createdOriginalDataPoint
  })
}
