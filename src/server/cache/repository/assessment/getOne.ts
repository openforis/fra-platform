import { Objects } from 'utils/objects'

import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { UUID } from 'meta/uuid'

import { BaseProtocol, DB } from 'server/db/db'
import {
  getAssessmentWithMetaCache,
  PropsMetaCacheCycle,
} from 'server/cache/repository/assessment/_assessmentWithMetaCache'
import { _cacheAssessment } from 'server/cache/repository/assessment/_cacheAssessment'
import { getKeyAssessments, getKeyAssessmentsUuid } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

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

  const assessment: Assessment =
    Objects.isEmpty(assessmentCache) || force
      ? await _cacheAssessment({ assessmentName, ...propsCache }, client)
      : JSON.parse(assessmentCache)

  return getAssessmentWithMetaCache({ assessment, ...propsCache })
}
