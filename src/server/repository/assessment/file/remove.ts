import { Assessment } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const remove = async (
  props: { assessment: Assessment; id: number },
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment, id } = props

  const schemaName = Schemas.getName(assessment)

  await client.query(`delete from ${schemaName}.file where id = $1 returning *;`, [id])
}
