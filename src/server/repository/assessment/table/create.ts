import { Objects } from 'utils/objects'

import { Assessment, Table } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

// create Table
export const create = async (
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
      insert into ${schemaName}.table (props, table_section_id)
      values ($1::JSONB, $2) returning *;`,
    [JSON.stringify(table.props), +table.tableSectionId],
    Objects.camelize
  )
}
