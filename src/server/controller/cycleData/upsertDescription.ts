import { CountryIso } from 'meta/area'
import {
  ActivityLogMessage,
  Assessment,
  CommentableDescriptionName,
  CommentableDescriptionValue,
  Cycle,
} from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: string
  value: CommentableDescriptionValue
  name: CommentableDescriptionName
  user: User
}

export const upsertDescription = async (props: Props, client: BaseProtocol = DB): Promise<string> => {
  const { countryIso, assessment, cycle, value, sectionName, name, user } = props
  return client.tx(async (t) => {
    const description = await DescriptionRepository.upsert(
      { assessment, cycle, countryIso, sectionName, name, value },
      t
    )

    const target = { name, description }
    const message = ActivityLogMessage.descriptionUpdate
    const activityLog = { target, section: sectionName, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ assessment, cycle, activityLog }, t)

    return description
  })
}
