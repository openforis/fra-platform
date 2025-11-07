import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Table } from 'meta/assessment/table'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

// remove item from table table
export const remove = async (
  params: {
    table: Table
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Table> => {
  const { assessment, table } = params
  const schemaName = Schemas.getName(assessment)

  return client.one<Table>(
    `
    delete from ${schemaName}.table where uuid = $1 returning *;`,
    [table.uuid],
    Objects.camelize
  )
}
