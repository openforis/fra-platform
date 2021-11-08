import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment'

export const createAssessment = async (
  props: { id: string; name: string },
  client: BaseProtocol = DB
): Promise<string> => {
  const { id, name } = props
  return AssessmentRepository.createAssessmentSchema({ id, name }, client)
}
