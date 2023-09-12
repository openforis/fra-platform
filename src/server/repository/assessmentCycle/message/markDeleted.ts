import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const markDeleted = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    id: number
  },
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment, cycle, id } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  await client.query(
    `
        update ${schemaCycle}.message
        set deleted = true
        where id = $1
    `,
    [id]
  )
}
