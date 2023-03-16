import { Assessment, Cycle } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'
import { get } from '@server/repository/assessment/assessment/get'

export const updateDefaultCycle = async (
  params: {
    assessment: Assessment
    cycle: Cycle
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { cycle, assessment } = params

  await client.query(`update assessment set props = props || '{"defaultCycle": $1~}' where id = $2;`, [
    cycle.uuid,
    assessment.id,
  ])
  return get({ id: assessment.id }, client)
}
