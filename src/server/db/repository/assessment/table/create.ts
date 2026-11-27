import { Assessment } from 'meta/assessment/assessment'
import { Table } from 'meta/assessment/table'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

// create Table
export const create = async (
  params: {
    table: Table
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<Table> => {
  const { assessment, table } = params
  const { name: assessmentName } = assessment.props
  const schemaName = Schemas.getSchemaAssessment({ assessmentName })

  return client.one<Table>(
    `
      insert into ${schemaName}.table (props, table_section_uuid)
      values ($1::JSONB, $2) returning *;`,
    [JSON.stringify(table.props), table.tableSectionUuid],
    Objects.camelize
  )
}
