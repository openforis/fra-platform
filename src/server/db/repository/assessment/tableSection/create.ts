import { Assessment } from 'meta/assessment/assessment'
import { TableSection } from 'meta/assessment/tableSection'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

// create TableSection
export const create = async (
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
      insert into ${schemaName}.table_section (props, section_uuid)
      values ($1::JSONB, $2) returning *;`,
    [JSON.stringify(tableSection.props), tableSection.sectionUuid],
    Objects.camelize
  )
}
