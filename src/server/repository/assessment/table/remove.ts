import { Objects } from 'utils/objects'

import { Assessment, Table } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

// remove item from table table
export const remove = async (
  params: {
    table: Table
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Table> => {
  const { table, assessment } = params
  const schemaName = Schemas.getName(assessment)

  return client.one<Table>(
    `
    delete from ${schemaName}.table where uuid = $1 returning *;`,
    [table.uuid],
    Objects.camelize
  )
}
