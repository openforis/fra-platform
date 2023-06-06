import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, CommentableDescriptionName, CommentableDescriptionValue, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const upsertDescription = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    value: CommentableDescriptionValue
    sectionName: string
    name: CommentableDescriptionName
    user: User
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const { countryIso, assessment, cycle, value, sectionName, name, user } = props
  return client.tx(async (t) => {
    const description = await DescriptionRepository.upsert(
      {
        countryIso,
        assessment,
        cycle,
        sectionName,
        name,
        value,
      },
      t
    )

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { name, description },
          section: sectionName,
          message: ActivityLogMessage.descriptionUpdate,
          countryIso,
          user,
        },
        cycle,
        assessment,
      },
      t
    )
    return description
  })
}
