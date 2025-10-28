import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db/db'
import { getCreateSchemaDDL } from 'server/db/repository/assessment/assessment/getCreateSchemaDDL'
import { Schemas } from 'server/db/schemas'

const client: BaseProtocol = DB

export const createAssessmentSchema = async (params: { assessment: Pick<Assessment, 'props'> }): Promise<string> => {
  const { assessment } = params

  const schemaName = Schemas.getName(assessment)

  await client.query(getCreateSchemaDDL(schemaName))

  return schemaName
}
