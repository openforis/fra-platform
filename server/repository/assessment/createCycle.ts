import { Assessment, Cycle } from '@meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { read } from './read'

export const createCycle = async (
  params: {
    assessment: Assessment
    name: string
  },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { assessment, name } = params

  await client.one<Cycle>(
    `
    insert into assessment_cycle (assessment_id, name) values ($1, $2) returning *;
  `,
    [assessment.id, name]
  )

  return read({ id: assessment.id }, client)
}
