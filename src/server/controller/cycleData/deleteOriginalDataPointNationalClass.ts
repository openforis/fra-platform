import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { User } from 'meta/user'

import { updateOriginalDataPointDependentNodes } from 'server/controller/cycleData/updateOriginalDataPointDependentNodes'
import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const deleteOriginalDataPointNationalClass = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    id: string
    index: number
    user: User
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, id, index, user } = props

  return client.tx(async (t) => {
    const originalDataPoint = await OriginalDataPointRepository.deleteNationalClass({ assessment, cycle, id, index }, t)

    const message = ActivityLogMessage.originalDataPointUpdateNationalClasses
    const { countryIso } = originalDataPoint
    const section = 'odp'

    const activityLog = { target: originalDataPoint, section, message, countryIso, user }

    const params = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(params, t)

    await updateOriginalDataPointDependentNodes({ assessment, cycle, originalDataPoint, user }, t)

    return originalDataPoint
  })
}
