import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Assessment } from '@meta/assessment'

export const read = async (
  props: { name: string; metaCache?: boolean } | { id: number; metaCache?: boolean },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  return AssessmentRepository.read(props, client)
}
