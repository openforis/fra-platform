import { Assessment } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'
import { read } from '@server/repository/assessment/assessment/read'

import { Adapter } from '../../adapter'

export const updateDefaultCycle = async (
  params: {
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment } = params

  const assessmentUpdated = await client.one<Assessment>(
    `update assessment set props = props || '{"defaultCycle": $1~}' where id = $2 returning  *;`,
    [assessment.props.defaultCycle, assessment.id],
    Adapter.AssessmentAdapter
  )
  return read({ id: assessmentUpdated.id }, client)
}
