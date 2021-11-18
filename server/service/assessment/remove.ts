import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Assessment } from '@core/meta/assessment'

export const remove = async (props: { assessment: Assessment }, client: BaseProtocol = DB): Promise<Assessment> => {
  const { assessment } = props

  await AssessmentRepository.removeAssessmentSchema({ assessment }, client)
  return AssessmentRepository.removeAssessment({ assessment }, client)
}
