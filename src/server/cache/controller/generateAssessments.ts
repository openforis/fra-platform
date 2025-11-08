import { RecordAssessments } from 'meta/assessment/assessment'

import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

export const generateAssessments = async (client: BaseProtocol = DB): Promise<RecordAssessments> => {
  const assessments = await AssessmentRedisRepository.getAssessmentsMap({ force: true }, client)

  Object.values(assessments).forEach((assessment) => {
    const { name: assessmentName } = assessment.props
    const cycleNames = assessment.cycles.map((cycle) => cycle.name).join(', ')
    Logger.info(`${assessmentName} - with ${assessment.cycles.length} cycles: ${cycleNames}`)
  })

  return assessments
}
