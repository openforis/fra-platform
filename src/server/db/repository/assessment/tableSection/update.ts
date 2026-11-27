import { Assessment } from 'meta/assessment/assessment'
import { TableSection } from 'meta/assessment/tableSection'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

// Update table_section in database
export const update = async (
  params: {
    tableSection: TableSection
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<TableSection> => {
  const { assessment, tableSection } = params
  const { name: assessmentName } = assessment.props
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  return client.one<TableSection>(
    `
      update ${schemaName}.table_section
      set props = $1::jsonb, section_uuid = $2
      where id = $3 returning *;`,
    [JSON.stringify(tableSection.props), tableSection.sectionUuid, +tableSection.id],
    Objects.camelize
  )
}
