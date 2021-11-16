import { Assessment } from '@core/meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const removeAssessment = async (
  params: {
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment } = params

  return client.one<Assessment>(
    `delete from public.assessment where id = $1 returning *;`,
    [assessment.id],
    Objects.camelize
  )
}
