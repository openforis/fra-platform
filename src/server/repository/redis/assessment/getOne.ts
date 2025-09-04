import { Objects } from 'utils/objects'

import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { UUID } from 'meta/uuid'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import {
  getAssessmentWithMetaCache,
  PropsMetaCacheCycle,
} from 'server/repository/redis/assessment/_assessmentWithMetaCache'
import { _cacheAssessment } from 'server/repository/redis/assessment/_cacheAssessment'
import { getKeyAssessments, getKeyAssessmentsUuid } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type PropsBase = { assessmentName: AssessmentName } | { uuid: UUID }
export type PropsGetOneAssessment = PropsBase & PropsMetaCacheCycle & { force?: boolean }

export const getOne = async (props: PropsGetOneAssessment, client: BaseProtocol = DB): Promise<Assessment> => {
  const { force = false, ...propsCache } = props

  const redis = RedisData.getInstance()
  const key = getKeyAssessments()

  let assessmentName: AssessmentName
  if ('assessmentName' in props) assessmentName = props.assessmentName
  if ('uuid' in props) assessmentName = await redis.hget(getKeyAssessmentsUuid(), props.uuid)

  const assessmentCache = await redis.hget(key, assessmentName)

  let assessment: Assessment
  if (Objects.isEmpty(assessmentCache) || force) {
    const assessmentBase = await AssessmentRepository.getOne({ assessmentName }, client)
    assessment = await _cacheAssessment({ assessmentBase, ...propsCache })
  } else {
    assessment = JSON.parse(assessmentCache)
  }

  return getAssessmentWithMetaCache({ assessment, ...propsCache })
}
