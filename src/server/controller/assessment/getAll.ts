import { Assessment } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

type Props = { metaCache?: boolean }

export const getAll = async (props: Props, client: BaseProtocol = DB): Promise<Array<Assessment>> => {
  return AssessmentRepository.getAll(props, client)
}
