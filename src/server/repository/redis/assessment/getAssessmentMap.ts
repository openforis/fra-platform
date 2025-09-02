import { AssessmentNames, RecordAssessments } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db'
import { getOne } from 'server/repository/redis/assessment/getOne'

type Props = {
  force: boolean
}

export const getAssessmentMap = async (props: Props, client: BaseProtocol = DB): Promise<RecordAssessments> => {
  const { force = false } = props

  const assessmentMap: RecordAssessments = {}

  await Promise.all(
    [AssessmentNames.fra, AssessmentNames.panEuropean].map(async (assessmentName) => {
      assessmentMap[assessmentName] = await getOne({ assessmentName, force }, client)
    })
  )

  return assessmentMap
}
