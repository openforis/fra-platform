import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { ODPs } from 'meta/assessment/odps'
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
  id: string
  index: number
  user: User
}

export const deleteNationalClass = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, country, cycle, id, index, user } = props

  const updatedNationalDataPoint = await client.tx(async (t) => {
    const originalDataPoint = await OriginalDataPointRepository.deleteNationalClass({ assessment, cycle, id, index }, t)
    const updatedOriginalDataPoint = await OriginalDataPointRepository.updateOriginalData(
      { assessment, cycle, originalDataPoint: ODPs.calculateValues(originalDataPoint) },
      t
    )

    const message = ActivityLogMessage.originalDataPointUpdateNationalClasses
    const { countryIso } = updatedOriginalDataPoint
    const section = 'odp'
    const activityLog = { target: updatedOriginalDataPoint, section, message, countryIso, user }
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { activityLog, assessment, cycle },
      t
    )

    await CountryService.updateLastEdit({ assessment, cycle, country, user, lastEditOdp: true, lastUpdateTimestamp }, t)

    await updateOriginalDataPointDependentNodes(
      { assessment, cycle, country, originalDataPoint: updatedOriginalDataPoint, user },
      t
    )
    return updatedOriginalDataPoint
  })

  await validateNationalClasses({
    assessment,
    countryIso: updatedNationalDataPoint.countryIso,
    cycle,
    nationalDataPoint: updatedNationalDataPoint,
  })

  return updatedNationalDataPoint
}
