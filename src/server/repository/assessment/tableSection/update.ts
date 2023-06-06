import { Objects } from 'utils/objects'

import { Assessment, TableSection } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

// Update table_section in database
export const update = async (
  params: {
    tableSection: TableSection
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<TableSection> => {
  const { tableSection, assessment } = params
  const schemaName = Schemas.getName(assessment)

  return client.one<TableSection>(
    `
      update ${schemaName}.table_section
      set props = $1::jsonb, section_id = $2
      where id = $3 returning *;`,
    [JSON.stringify(tableSection.props), +tableSection.sectionId, +tableSection.id],
    Objects.camelize
  )
}
