import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { TableSection } from 'meta/assessment/tableSection'

import { BaseProtocol, DB, Schemas } from 'server/db'

// remove item from table_section table
export const remove = async (
  params: {
    tableSection: TableSection
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<TableSection> => {
  const { assessment, tableSection } = params
  const schemaName = Schemas.getName(assessment)

  return client.one<TableSection>(
    `
      delete from ${schemaName}.table_section where uuid = $1 returning *;`,
    [tableSection.uuid],
    Objects.camelize
  )
}
