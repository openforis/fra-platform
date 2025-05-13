import { Country } from 'meta/area'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { CountryService } from 'server/service/country'

import { updateOriginalDataPointDependentNodes } from './updateDependants/updateOriginalDataPointDependentNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  originalDataPoint: OriginalDataPoint
  user: User
  sectionName: string
}

export const updateOriginalDataPointOriginalData = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, country, cycle, originalDataPoint, sectionName, user } = props
  const { countryIso } = originalDataPoint

  const odpReturn = await client.tx(async (t) => {
    const updatedOriginalDataPoint = await OriginalDataPointRepository.updateOriginalData(
      { assessment, cycle, originalDataPoint },
      t
    )

    const activityLog = {
      target: updatedOriginalDataPoint,
      section: 'odp',
      message: ActivityLogMessage.originalDataPointUpdateOriginalData,
      countryIso,
      user,
    }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)
    await CountryService.updateLastEdit({ assessment, cycle, country, user, lastEditOdp: true }, t)

    return updatedOriginalDataPoint
  })

  await updateOriginalDataPointDependentNodes({
    assessment,
    cycle,
    country,
    sectionName,
    originalDataPoint: odpReturn,
    user,
  })

  return odpReturn
}
