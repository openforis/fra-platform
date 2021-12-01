import { Assessment } from '@core/meta/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'

export const removeAssessmentSchema = async (
  params: {
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment } = params
  const schemaName = Schemas.getName(assessment)

  await client.query<void>(`drop schema ${schemaName} cascade;`)
}
