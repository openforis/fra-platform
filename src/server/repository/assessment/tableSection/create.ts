import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { TableSection } from 'meta/assessment/tableSection'

import { BaseProtocol, DB, Schemas } from 'server/db'

// create TableSection
export const create = async (
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
      insert into ${schemaName}.table_section (props, section_id)
      values ($1::JSONB, $2) returning *;`,
    [JSON.stringify(tableSection.props), +tableSection.sectionId],
    Objects.camelize
  )
}
