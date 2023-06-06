import { Assessment } from 'meta/assessment'
import { DB, Schemas } from 'server/db'

export const removeAssessmentSchema = async (props: { assessment: Assessment }): Promise<string> => {
  const { assessment } = props
  const schemaName = Schemas.getName(assessment)

  await DB.query<void>(`drop schema if exists ${schemaName} cascade;`)

  return schemaName
}
