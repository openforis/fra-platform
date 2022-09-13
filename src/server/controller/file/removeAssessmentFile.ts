import { ActivityLogMessage, Assessment } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { AssessmentFileRepository } from '@server/repository/assessment/file'

export const removeAssessmentFile = async (
  props: {
    assessment: Assessment
    uuid: string
    user?: User
  },
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment, uuid, user } = props

  return client.tx(async (t) => {
    const { fileName } = await AssessmentFileRepository.remove({ assessment, uuid }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { fileName },
          section: 'assessment',
          message: ActivityLogMessage.assessmentFileDelete,
          user,
        },
        assessment,
      },
      t
    )
  })
}
