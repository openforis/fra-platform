import { Objects } from 'utils/objects'

import { Assessment, AssessmentName } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { _cacheAssessment } from 'server/repository/redis/assessment/_cacheAssessment'
import { getKeyAssessments } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessmentName: AssessmentName
  force?: boolean
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<Assessment> => {
  const { assessmentName, force = false } = props

  const redis = RedisData.getInstance()
  const key = getKeyAssessments()

  const assessment = await redis.hget(key, assessmentName)

  if (Objects.isEmpty(assessment) || force) {
    const assessmentBase = await AssessmentRepository.getOne({ assessmentName }, client)
    return _cacheAssessment({ assessmentBase })
  }

  return JSON.parse(assessment)
}
