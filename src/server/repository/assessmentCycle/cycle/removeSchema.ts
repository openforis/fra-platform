import { Assessment, Cycle } from 'meta/assessment'
import { DB, Schemas } from 'server/db'

export const removeSchema = async (params: { assessment: Assessment; cycle: Cycle }): Promise<string> => {
  const { assessment, cycle } = params
  const cycleSchemaName = Schemas.getNameCycle(assessment, cycle)

  await DB.query<void>(`drop schema if exists ${cycleSchemaName} cascade;`)

  return cycleSchemaName
}
