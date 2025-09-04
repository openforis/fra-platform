import { Assessment, AssessmentBase, CycleIndexes } from 'meta/assessment/assessment'

import { getKeyAssessments, getKeyAssessmentsUuid } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = { assessmentBase: AssessmentBase }

export const _cacheAssessment = async (props: Props): Promise<Assessment> => {
  const { assessmentBase } = props

  // create cycleIndexes
  const cycleIndexes = assessmentBase.cycles.reduce<CycleIndexes>(
    (acc, cycle, index) => {
      const { name, uuid } = cycle
      acc.name[name] = index
      acc.uuid[uuid] = index
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
  return assessment
}
