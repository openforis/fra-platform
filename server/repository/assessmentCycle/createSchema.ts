import { Assessment, Cycle } from '@meta/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'
import { getCreateSchemaCycleDDL } from '@server/repository/assessment/getCreateSchemaDDL'

export const createSchema = async (
  params: {
    assessment: Assessment
    cycle: Cycle
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const { assessment, cycle } = params

  const schemaName = Schemas.getName(assessment)
  const cycleSchemaName = Schemas.getNameCycle(assessment, cycle)

  await client.query(getCreateSchemaCycleDDL(schemaName, cycleSchemaName))

  return cycleSchemaName
}
