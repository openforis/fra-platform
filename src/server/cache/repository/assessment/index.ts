import { getAssessmentsList } from 'server/cache/repository/assessment/getAssessmentsList'
import { getAssessmentsMap } from 'server/cache/repository/assessment/getAssessmentsMap'
import { getOne } from 'server/cache/repository/assessment/getOne'
import { getOneWithCycle } from 'server/cache/repository/assessment/getOneWithCycle'
import { removeOne } from 'server/cache/repository/assessment/removeOne'

export const AssessmentRedisRepository = {
  getAssessmentsList,
  getAssessmentsMap,
  getOne,
  getOneWithCycle,
  removeOne,
}
