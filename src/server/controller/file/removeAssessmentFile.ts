import { ActivityLogMessage, Assessment } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentFileRepository } from 'server/repository/assessment/file'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type removeAssessmentFileProps = {
  assessment: Assessment
  uuid: string
  user?: User
}

export const removeAssessmentFile = async (
  props: removeAssessmentFileProps,
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment, uuid, user } = props

  return client.tx(async (t) => {
    const { fileName } = await AssessmentFileRepository.remove({ assessment, uuid }, t)

    const target = { fileName }
    const message = ActivityLogMessage.assessmentFileDelete
    const activityLog = { target, section: 'assessment', message, user }
    const params = { activityLog, assessment }
    await ActivityLogRepository.insertActivityLog(params, t)
  })
}
