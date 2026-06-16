import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { CountryService } from 'server/service/country'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  originalDataPoint: OriginalDataPoint
  user: User
}

const name = CommentableDescriptionName.dataSources
const sectionName = SectionNames.nationalDataPoint

export const updateDataSources = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, country, cycle, originalDataPoint, user } = props
  const { countryIso, dataSources, uuid } = originalDataPoint

  return client.tx(async (t) => {
    await DescriptionRepository.upsert(
      { assessment, countryIso, cycle, name, sectionName, sectionUuid: uuid, value: dataSources },
      t
    )

    const activityLog = {
      target: originalDataPoint,
      section: 'odp',
      message: ActivityLogMessage.originalDataPointUpdateDataSources,
      countryIso,
      user,
    }
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { activityLog, assessment, cycle },
      t
    )

    await CountryService.updateLastEdit({ assessment, cycle, country, user, lastEditOdp: true, lastUpdateTimestamp }, t)

    return originalDataPoint
  })
}
