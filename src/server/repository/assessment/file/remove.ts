import { Assessment } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const remove = async (
  props: { assessment: Assessment; uuid: string },
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment, uuid } = props

  const schemaName = Schemas.getName(assessment)

  await client.query(`delete from ${schemaName}.file where uuid = $1 returning *;`, [uuid])
}
