import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { User } from 'meta/user/user'

import { validateNationalClasses } from 'server/controller/cycleData/validations/nationalDataPoint/validateNationalClasses'
import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
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

export const updateOriginalData = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, country, cycle, originalDataPoint, sectionName, user } = props
  const { countryIso } = originalDataPoint

  const updatedNationalDataPoint = await client.tx(async (t) => {
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
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { activityLog, assessment, cycle },
      t
    )
    await CountryService.updateLastEdit({ assessment, cycle, country, user, lastEditOdp: true, lastUpdateTimestamp }, t)

    await updateOriginalDataPointDependentNodes(
      {
        assessment,
        cycle,
        country,
        sectionName,
        originalDataPoint: updatedOriginalDataPoint,
        user,
      },
      t
    )

    return updatedOriginalDataPoint
  })

  await validateNationalClasses({
    assessment,
    countryIso,
    cycle,
    nationalDataPoint: updatedNationalDataPoint,
  })

  return updatedNationalDataPoint
}
