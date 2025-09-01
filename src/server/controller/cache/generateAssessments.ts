import { BaseProtocol, DB } from 'server/db'
import { AssessmentRedisRepository } from 'server/repository/redis/assessment'
import { Logger } from 'server/utils/logger'

export const generateAssessments = async (client: BaseProtocol = DB): Promise<void> => {
  const assessments = await AssessmentRedisRepository.getAssessmentMap({ force: true }, client)

  Object.entries(assessments).forEach(([assessmentName, assessment]) => {
    const cycleNames = assessment.cycles.map((cycle) => cycle.name).join(', ')
    Logger.info(`${assessmentName} - with ${assessment.cycles.length}: ${cycleNames}`)
  })
}
