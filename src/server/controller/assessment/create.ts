import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment, AssessmentBase } from 'meta/assessment/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = { user: User; assessment: Pick<Assessment, 'props'> }

export const create = async (props: Props, client: BaseProtocol = DB): Promise<AssessmentBase> => {
  const { assessment, user } = props
  await AssessmentRepository.createAssessmentSchema({ assessment })

  return client.tx(async (t) => {
    const createdAssessment = await AssessmentRepository.createAssessment({ assessment }, t)

    const message = ActivityLogMessage.assessmentCreate
    const activityLog = { target: createdAssessment, section: 'assessment', message, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment: createdAssessment }, t)
    return createdAssessment
  })
}
