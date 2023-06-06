import { Objects } from 'utils/objects'

import { Assessment, Table } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

// Update table in database
export const update = async (
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
            update ${schemaName}.table
            set props = $1::jsonb, table_section_id = $2
            where id = $3 returning *;`,
    [JSON.stringify(table.props), +table.tableSectionId, +table.id],
    Objects.camelize
  )
}
