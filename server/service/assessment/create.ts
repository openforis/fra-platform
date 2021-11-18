import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository, ActivityLogRepository, SettingsRepository } from '@server/repository'
import { Assessment } from '@core/meta/assessment'

import { ActivityLogMessage } from '@core/meta/activityLog'
import { User } from '@core/meta/user'

export const create = async (
  props: { user: User; assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment, user } = props
  const schemaName = await AssessmentRepository.createAssessmentSchema({ assessment }, client)

  const ret = await client.tx(async (t) => {
    const createdAssessment = await AssessmentRepository.createAssessment({ assessment }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: createdAssessment,
          section: 'assessment',
          message: ActivityLogMessage.assessmentCreate,
          user,
        },
        schemaName,
      },
      t
    )
    return createdAssessment
  })

  await SettingsRepository.update({
    settings: {
      defaultAssessmentId: ret.id,
    },
  })

  return ret
}
