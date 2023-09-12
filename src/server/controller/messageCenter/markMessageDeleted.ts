import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { MessageRepository } from 'server/repository/assessmentCycle/message'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const markMessageDeleted = async (
  props: {
    user: User
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    sectionName: string
    id: number
  },
  client: BaseProtocol = DB
): Promise<void> => {
  const { countryIso, assessment, cycle, sectionName, id, user } = props

  return client.tx(async (t) => {
    await MessageRepository.markDeleted({ assessment, cycle, id }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { id },
          section: sectionName,
          message: ActivityLogMessage.messageMarkDeleted,
          countryIso,
          user,
        },
        assessment,
        cycle,
      },
      t
    )
  })
}
