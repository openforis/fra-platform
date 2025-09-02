import { Assessment, AssessmentBase, CycleIndexes } from 'meta/assessment/assessment'

import { getKeyAssessments } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = { assessmentBase: AssessmentBase }

export const _cacheAssessment = async (props: Props): Promise<Assessment> => {
  const { assessmentBase } = props

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

  // put assessment in redis
  const key = getKeyAssessments()
  const redis = RedisData.getInstance()
  await redis.hmset(key, assessmentName, JSON.stringify(assessment))

  return assessment
}
