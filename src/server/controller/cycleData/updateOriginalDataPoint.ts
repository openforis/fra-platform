import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { User } from '@meta/user'

import { updateOriginalDataPointDependentNodes } from '@server/controller/cycleData/updateOriginalDataPointDependentNodes'
import { BaseProtocol, DB } from '@server/db'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from '@server/repository/public/activityLog'

export const updateOriginalDataPoint = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    countryIso: CountryIso
    originalDataPoint: OriginalDataPoint
    user: User
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, countryIso, cycle, originalDataPoint, user } = props

  return client.tx(async (t) => {
    const updatedOriginalDataPoint = await OriginalDataPointRepository.update(
      { assessment, cycle, originalDataPoint },
      t
    )

    await updateOriginalDataPointDependentNodes({ assessment, cycle, countryIso, originalDataPoint, user }, client)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: updatedOriginalDataPoint,
          section: 'odp',
          message: ActivityLogMessage.originalDataPointUpdate,
          countryIso: originalDataPoint.countryIso,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    return updatedOriginalDataPoint
  })
}
