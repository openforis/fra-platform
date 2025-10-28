import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db'
import { PropsGetAssessments } from 'server/cache/repository/assessment/_propsGetAssessments'
import { getAssessmentsMap } from 'server/cache/repository/assessment/getAssessmentsMap'

export const getAssessmentsList = async (
  props: PropsGetAssessments,
  client: BaseProtocol = DB
): Promise<Array<Assessment>> => {
  const assessmentsMap = await getAssessmentsMap(props, client)

  return Object.values(assessmentsMap)
}
