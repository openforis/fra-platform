import { Assessment, AssessmentBase, CycleIndexes } from 'meta/assessment/assessment'

import { getAssessmentWithMetaCache } from 'server/repository/redis/assessment/_assessmentWithMetaCache'
import { getKeyAssessments, getKeyAssessmentsUuid } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = { assessmentBase: AssessmentBase; metaCache?: boolean }

export const _cacheAssessment = async (props: Props): Promise<Assessment> => {
  const { assessmentBase, metaCache } = props

  // create cycleIndexes
  const cycleIndexes = assessmentBase.cycles.reduce<CycleIndexes>(
    (acc, cycle, index) => {
      const { name: cycleName, uuid: cycleUuid } = cycle
      acc.name[cycleName] = index
      acc.uuid[cycleUuid] = index
      return acc
    },
    { name: {}, uuid: {} }
  )

  // init assessment
  const assessment: Assessment = { ...assessmentBase, cycleIndexes }
  const { name: assessmentName } = assessment.props

  const redis = RedisData.getInstance()
  // store assessment in redis
  const keyAssessments = getKeyAssessments()
  await redis.hmset(keyAssessments, assessmentName, JSON.stringify(assessment))
  // store assessments uuid mapping
  const keyAssessmentsUuid = getKeyAssessmentsUuid()
  await redis.hmset(keyAssessmentsUuid, assessment.uuid, assessmentName)

  // return
  return getAssessmentWithMetaCache({ assessment, metaCache })
}
