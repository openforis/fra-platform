import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Assessment } from '@core/meta/assessment'

export const read = async (
  props: { name: string } | { id: number },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  if ('id' in props) {
    return AssessmentRepository.readById({ id: props.id }, client)
  }
  return AssessmentRepository.read({ name: props.name }, client)
}
