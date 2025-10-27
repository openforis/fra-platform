import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = { user: User; assessment: Pick<Assessment, 'props'> }

export const create = async (props: Props, client: BaseProtocol = DB): Promise<Assessment> => {
  const { assessment, user } = props
  await AssessmentRepository.createAssessmentSchema({ assessment })

  return client.tx(async (t) => {
    const assessmentBase = await AssessmentRepository.createAssessment({ assessment }, t)

    const message = ActivityLogMessage.assessmentCreate
    const activityLog = { target: assessmentBase, section: 'assessment', message, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment: assessmentBase }, t)

    const { name: assessmentName } = assessmentBase.props
    return AssessmentRedisRepository.getOne({ assessmentName, force: true }, t)
  })
}
