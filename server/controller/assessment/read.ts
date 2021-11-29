import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Assessment } from '@core/meta/assessment'

export const read = async (
  props: { name: string } | { id: number },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  return AssessmentRepository.read(props, client)
}
