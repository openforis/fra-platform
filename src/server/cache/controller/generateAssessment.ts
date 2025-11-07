import { Assessment, AssessmentName } from 'meta/assessment/assessment'

import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

type Props = { assessmentName: AssessmentName }

export const generateAssessment = async (props: Props, client: BaseProtocol = DB): Promise<Assessment> => {
  const { assessmentName } = props

  const assessment = await AssessmentRedisRepository.getOne({ assessmentName, force: true }, client)
  const cycleNames = assessment.cycles.map((cycle) => cycle.name).join(', ')
  Logger.info(`${assessmentName} - with ${assessment.cycles.length} cycles: ${cycleNames}`)

  return assessment
}
