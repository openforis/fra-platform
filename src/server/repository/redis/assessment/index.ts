import { getAssessmentMap } from 'server/repository/redis/assessment/getAssessmentMap'
import { getOne } from 'server/repository/redis/assessment/getOne'
import { getOneWithCycle } from 'server/repository/redis/assessment/getOneWithCycle'

export const AssessmentRedisRepository = {
  getAssessmentMap,
  getOne,
  getOneWithCycle,
}
