import { Assessment, Cycle } from '@meta/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'

export const removeCycleSchema = async (
  params: {
    assessment: Assessment
    cycle: Cycle
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const { assessment, cycle } = params
  const cycleSchemaName = Schemas.getNameCycle(assessment, cycle)

  await client.query<void>(`drop schema ${cycleSchemaName} cascade;`)

  return cycleSchemaName
}
