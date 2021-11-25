import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Assessment } from '@core/meta/assessment'

export const read = async (props: { name: string }, client: BaseProtocol = DB): Promise<Assessment> => {
  const { name } = props

  return AssessmentRepository.read({ name }, client)
}
