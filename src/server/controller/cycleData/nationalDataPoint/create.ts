import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
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
  notifyClient?: boolean
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, country, cycle, notifyClient = true, originalDataPoint, sectionName, user } = props
  const { countryIso } = originalDataPoint

  return client.tx(async (t) => {
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
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { activityLog, assessment, cycle },
      t
    )

    await CountryService.updateLastEdit(
      { lastUpdateTimestamp, assessment, cycle, country, user, lastEditOdp: true, notifyClient },
      t
    )

    if (ProcessEnv.nodeEnv !== NodeEnv.test) {
      await updateOriginalDataPointDependentNodes(
        {
          assessment,
          cycle,
          country,
          sectionName,
          originalDataPoint: createdOriginalDataPoint,
          user,
        },
        t
      )
    }

    return createdOriginalDataPoint
  })
}
