import { Assessment, AssessmentName } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRedisRepository } from 'server/repository/redis/assessment'
import { Logger } from 'server/utils/logger'

type Props = { assessmentName: AssessmentName }

export const generateAssessment = async (props: Props, client: BaseProtocol = DB): Promise<Assessment> => {
  const { assessmentName } = props

  const assessment = await AssessmentRedisRepository.getOne({ assessmentName, force: true }, client)
  const cycleNames = assessment.cycles.map((cycle) => cycle.name).join(', ')
  Logger.info(`${assessmentName} - with ${assessment.cycles.length} cycles: ${cycleNames}`)

  return assessment
}
