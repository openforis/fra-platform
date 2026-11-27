import { Assessment } from 'meta/assessment/assessment'
import { TableSection } from 'meta/assessment/tableSection'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

// remove item from table_section table
export const remove = async (
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
      delete from ${schemaName}.table_section where uuid = $1 returning *;`,
    [tableSection.uuid],
    Objects.camelize
  )
}
