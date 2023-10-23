import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { ProcessEnv } from 'server/utils'
import { NodeEnv } from 'server/utils/processEnv'

import { updateOriginalDataPointDependentNodes } from './updateDependants/updateOriginalDataPointDependentNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  sectionName: string
  originalDataPoint: OriginalDataPoint
  user: User
}

export const createOriginalDataPoint = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, cycle, sectionName, originalDataPoint, user } = props
  const { countryIso } = originalDataPoint

  const odpReturn = await client.tx(async (t) => {
    const createdOriginalDataPoint = await OriginalDataPointRepository.create(
      { assessment, cycle, originalDataPoint },
      t
    )

    const activityLog = {
      target: createdOriginalDataPoint,
      section: 'odp',
      message: ActivityLogMessage.originalDataPointCreate,
      countryIso,
      user,
    }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    return createdOriginalDataPoint
  })

  if (ProcessEnv.nodeEnv !== NodeEnv.test) {
    await updateOriginalDataPointDependentNodes({ assessment, cycle, sectionName, originalDataPoint: odpReturn, user })
  }

  return odpReturn
}
