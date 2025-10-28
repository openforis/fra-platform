import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { User } from 'meta/user'

import { DB } from 'server/db/db'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { UserRepository } from 'server/db/repository/public/user'
import { AssessmentRedisRepository } from 'server/cache/repository/assessment'

type Props = {
  user: User
  userIdToKeep: number
  userIdToRemove: number
}

type Returned = {
  userKept: User
  userRemoved: User
}

export const mergeUsers = async (props: Props): Promise<Returned> => {
  const { user, userIdToKeep, userIdToRemove } = props

  return DB.tx<Returned>(async (client) => {
    const assessments = await AssessmentRedisRepository.getAssessmentsList({}, client)

    const target = await UserRepository.mergeUsers({ assessments, userIdToKeep, userIdToRemove }, client)

    const message = ActivityLogMessage.usersMerge
    const activityLog: ActivityLog<Returned> = { message, section: 'users', target, user }
    await ActivityLogRepository.insertActivityLog({ activityLog }, client)

    return target
  })
}
