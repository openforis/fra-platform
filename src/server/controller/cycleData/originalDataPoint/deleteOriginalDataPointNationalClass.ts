import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

import { updateOriginalDataPointDependentNodes } from './updateDependants/updateOriginalDataPointDependentNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  id: string
  index: number
  user: User
}

export const deleteOriginalDataPointNationalClass = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, id, index, user } = props

  const odpReturn = await client.tx(async (t) => {
    const originalDataPoint = await OriginalDataPointRepository.deleteNationalClass({ assessment, cycle, id, index }, t)

    const message = ActivityLogMessage.originalDataPointUpdateNationalClasses
    const { countryIso } = originalDataPoint
    const section = 'odp'
    const activityLog = { target: originalDataPoint, section, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    return originalDataPoint
  })

  await updateOriginalDataPointDependentNodes({ assessment, cycle, originalDataPoint: odpReturn, user })

  return odpReturn
}
