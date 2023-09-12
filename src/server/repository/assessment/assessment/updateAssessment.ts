import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { getOne } from 'server/repository/assessment/assessment/getOne'

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
  return getOne({ id: assessment.id }, client)
}
