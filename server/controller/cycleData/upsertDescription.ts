import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { CommentableDescriptionName } from '@meta/assessment/commentableDescription'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { DescriptionRepository } from '@server/repository/assessmentCycle/descriptions'

export const upsertDescription = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    content: string
    sectionName: string
    name: CommentableDescriptionName
    user: User
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const { countryIso, assessment, cycle, content, sectionName, name, user } = props
  return client.tx(async (t) => {
    const description = await DescriptionRepository.upsert(
      {
        countryIso,
        assessment,
        cycle,
        sectionName,
        name,
        content,
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
