import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment'
import { Assessment } from '@core/meta/assessment'

export const createAssessment = async (
  props: { assessment: Assessment },
  client: BaseProtocol = DB
): Promise<string> => {
  const { assessment } = props
  return AssessmentRepository.createAssessmentSchema({ assessment }, client)
}
