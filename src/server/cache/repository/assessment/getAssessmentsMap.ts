import { AssessmentNames, RecordAssessments } from 'meta/assessment/assessment'

import { PropsGetAssessments } from 'server/cache/repository/assessment/_propsGetAssessments'
import { getOne } from 'server/cache/repository/assessment/getOne'
import { BaseProtocol, DB } from 'server/db/db'

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
