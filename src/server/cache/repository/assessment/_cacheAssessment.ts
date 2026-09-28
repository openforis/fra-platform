import { Assessment, AssessmentName, CycleIndexes } from 'meta/assessment/assessment'

import { getKeyAssessments, getKeyAssessmentsUuid } from 'server/cache/repository/keys'
import { BaseProtocol, DB } from 'server/db/db'
import { AssessmentRepository } from 'server/db/repository/assessment/assessment'
import { RedisDataClient } from 'server/redis/dataClient'

type Props = { assessmentName: AssessmentName }

export const _cacheAssessment = async (props: Props, client: BaseProtocol = DB): Promise<Assessment> => {
  const { assessmentName } = props

  const assessmentBase = await AssessmentRepository.getOne({ assessmentName }, client)

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

  const redis = RedisDataClient.getInstance()
  // store assessment in redis
  const keyAssessments = getKeyAssessments()
  await redis.hmset(keyAssessments, assessmentName, JSON.stringify(assessment))
  // store assessments uuid mapping
  const keyAssessmentsUuid = getKeyAssessmentsUuid()
  await redis.hmset(keyAssessmentsUuid, assessment.uuid, assessmentName)

  // return
  return assessment
}
