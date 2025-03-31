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
import { ProcessEnv } from 'server/utils'
import { NodeEnv } from 'server/utils/processEnv'

import { updateOriginalDataPointDependentNodes } from './updateDependants/updateOriginalDataPointDependentNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  sectionName: string
  originalDataPoint: OriginalDataPoint
  user: User
}

export const createOriginalDataPoint = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, cycle, sectionName, originalDataPoint, user, country } = props
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

    await CountryService.setCountryStatusEditing({ assessment, cycle, country, user }, t)

    return createdOriginalDataPoint
  })

  if (ProcessEnv.nodeEnv !== NodeEnv.test) {
    await updateOriginalDataPointDependentNodes({ assessment, cycle, sectionName, originalDataPoint: odpReturn, user })
  }

  return odpReturn
}
