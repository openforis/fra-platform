import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { CountryService } from 'server/service/country'
import { DataValidationService } from 'server/service/dataValidation'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  sectionName: string
  value: CommentableDescriptionValue
  name: CommentableDescriptionName
  user: User
}

export const upsertDescription = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<CommentableDescriptionValue> => {
  const { assessment, country, cycle, name, sectionName, user, value } = props
  const { countryIso } = country

  const description = await client.tx(async (t) => {
    const description = await DescriptionRepository.upsert(
      { assessment, cycle, countryIso, sectionName, name, value },
      t
    )

    const target = { name, description: description.value }
    const message = ActivityLogMessage.descriptionUpdate
    const activityLog = { target, section: sectionName, message, countryIso, user }
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { assessment, cycle, activityLog },
      t
    )

    await CountryService.updateLastEdit({ assessment, cycle, country, user, lastUpdateTimestamp }, t)

    return description
  })

  await DataValidationService.validateDescriptions({
    assessment,
    country,
    cycle,
    descriptions: [description],
  })

  return description.value
}
