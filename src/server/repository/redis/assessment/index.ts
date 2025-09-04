import { getAssessmentsList } from 'server/repository/redis/assessment/getAssessmentsList'
import { getAssessmentsMap } from 'server/repository/redis/assessment/getAssessmentsMap'
import { getOne } from 'server/repository/redis/assessment/getOne'
import { getOneWithCycle } from 'server/repository/redis/assessment/getOneWithCycle'

export const AssessmentRedisRepository = {
  getAssessmentsMap,
  getAssessmentsList,
  getOne,
  getOneWithCycle,
}
