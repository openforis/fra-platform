import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { User } from 'meta/user'

import { updateOriginalDataPointDependentNodes } from 'server/controller/cycleData/originalDataPoint/updateOriginalDataPointDependentNodes'
import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  originalDataPoint: OriginalDataPoint
  user: User
  sectionName: string
}

export const updateOriginalDataPointOriginalData = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, sectionName, originalDataPoint, user } = props

  return client.tx(async (t) => {
    const updatedOriginalDataPoint = await OriginalDataPointRepository.updateOriginalData(
      { assessment, cycle, originalDataPoint },
      t
    )

    const activityLog = {
      target: updatedOriginalDataPoint,
      section: 'odp',
      message: ActivityLogMessage.originalDataPointUpdateOriginalData,
      countryIso: originalDataPoint.countryIso,
      user,
    }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    await updateOriginalDataPointDependentNodes(
      { assessment, cycle, sectionName, originalDataPoint: updatedOriginalDataPoint, user },
      t
    )

    return updatedOriginalDataPoint
  })
}
