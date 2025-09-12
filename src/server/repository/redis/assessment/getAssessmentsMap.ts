import { AssessmentNames, RecordAssessments } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db'
import { PropsGetAssessments } from 'server/repository/redis/assessment/_propsGetAssessments'
import { getOne } from 'server/repository/redis/assessment/getOne'

export const getAssessmentsMap = async (
  props: PropsGetAssessments,
  client: BaseProtocol = DB
): Promise<RecordAssessments> => {
  const { force, metaCache } = props

  const assessmentMap: RecordAssessments = {}

  await Promise.all(
    [AssessmentNames.fra, AssessmentNames.panEuropean].map(async (assessmentName) => {
      assessmentMap[assessmentName] = await getOne({ assessmentName, force, metaCache }, client)
    })
  )

  return assessmentMap
}
