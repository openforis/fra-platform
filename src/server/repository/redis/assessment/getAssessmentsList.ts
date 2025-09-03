import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db'
import { PropsGetAssessments } from 'server/repository/redis/assessment/_propsGetAssessments'
import { getAssessmentMap } from 'server/repository/redis/assessment/getAssessmentMap'

export const getAssessmentsList = async (
  props: PropsGetAssessments,
  client: BaseProtocol = DB
): Promise<Array<Assessment>> => {
  const assessmentsMap = await getAssessmentMap(props, client)

  return Object.values(assessmentsMap)
}
