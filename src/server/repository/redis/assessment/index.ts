import { getAssessmentsList } from 'server/repository/redis/assessment/getAssessmentsList'
import { getAssessmentsMap } from 'server/repository/redis/assessment/getAssessmentsMap'
import { getOne } from 'server/repository/redis/assessment/getOne'
import { getOneWithCycle } from 'server/repository/redis/assessment/getOneWithCycle'
import { removeOne } from 'server/repository/redis/assessment/removeOne'

export const AssessmentRedisRepository = {
  getAssessmentsList,
  getAssessmentsMap,
  getOne,
  getOneWithCycle,
  removeOne,
}
