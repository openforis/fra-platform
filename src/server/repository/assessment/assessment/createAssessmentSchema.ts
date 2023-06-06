import { Assessment } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { getCreateSchemaDDL } from 'server/repository/assessment/assessment/getCreateSchemaDDL'

export const createAssessmentSchema = async (
  params: {
    assessment: Pick<Assessment, 'props'>
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const { assessment } = params

  const schemaName = Schemas.getName(assessment)

  await client.query(getCreateSchemaDDL(schemaName))

  return schemaName
}
