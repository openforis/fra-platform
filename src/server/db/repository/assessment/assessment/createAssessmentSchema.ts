import { AssessmentName } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db/db'
import { getCreateSchemaDDL } from 'server/db/repository/assessment/assessment/getCreateSchemaDDL'
import { Schemas } from 'server/db/schemas'

const client: BaseProtocol = DB

export const createAssessmentSchema = async (params: { assessmentName: AssessmentName }): Promise<string> => {
  const { assessmentName } = params

  const schemaName = Schemas.getSchemaAssessment(assessmentName)

  await client.query(getCreateSchemaDDL(schemaName))

  return schemaName
}
