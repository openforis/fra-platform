import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { MessageRepository } from '@server/repository/assessmentCycle/message'

export const markMessageDeleted = async (
  props: {
    user: User
    assessment: Assessment
    cycle: Cycle
    id: number
  },
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment, cycle, id, user } = props

  return client.tx(async (t) => {
    await MessageRepository.markDeleted({ assessment, cycle, id }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { id },
          section: 'messageCenter',
          message: ActivityLogMessage.messageMarkDeleted,
          user,
        },
        assessment,
        cycle,
      },
      t
    )
  })
}
