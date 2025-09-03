import { getAssessmentMap } from 'server/repository/redis/assessment/getAssessmentMap'
import { getAssessmentsList } from 'server/repository/redis/assessment/getAssessmentsList'
import { getOne } from 'server/repository/redis/assessment/getOne'
import { getOneWithCycle } from 'server/repository/redis/assessment/getOneWithCycle'

export const AssessmentRedisRepository = {
  getAssessmentMap,
  getAssessmentsList,
  getOne,
  getOneWithCycle,
}
