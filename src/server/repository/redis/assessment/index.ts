import { getAssessmentMap } from 'server/repository/redis/assessment/getAssessmentMap'
import { getOne } from 'server/repository/redis/assessment/getOne'

export const AssessmentRedisRepository = {
  getAssessmentMap,
  getOne,
}
