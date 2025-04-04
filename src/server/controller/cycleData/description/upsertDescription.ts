import { Country } from 'meta/area'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { CountryService } from 'server/service/country'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  sectionName: string
  value: CommentableDescriptionValue
  name: CommentableDescriptionName
  user: User
}

export const upsertDescription = async (props: Props, client: BaseProtocol = DB): Promise<string> => {
  const { assessment, cycle, country, value, sectionName, name, user } = props
  const { countryIso } = country

  return client.tx(async (t) => {
    const description = await DescriptionRepository.upsert(
      { assessment, cycle, countryIso, sectionName, name, value },
      t
    )

    const target = { name, description }
    const message = ActivityLogMessage.descriptionUpdate
    const activityLog = { target, section: sectionName, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ assessment, cycle, activityLog }, t)

    await CountryService.updateLastEdit({ assessment, cycle, country, user }, t)

    return description
  })
}
