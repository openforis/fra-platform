import { Assessment } from 'meta/assessment/assessment'

import { DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export const removeAssessmentSchema = async (props: { assessment: Assessment }): Promise<string> => {
  const { assessment } = props
  const schemaName = Schemas.getName(assessment)

  await DB.query<void>(`drop schema if exists ${schemaName} cascade;`)

  return schemaName
}
