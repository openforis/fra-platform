import { Assessment, Cycle } from 'meta/assessment'

import { DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const removeSchema = async (props: Props): Promise<string> => {
  const { assessment, cycle } = props
  const cycleSchemaName = Schemas.getNameCycle(assessment, cycle)

  await DB.query<void>(`drop schema if exists ${cycleSchemaName} cascade;`)

  return cycleSchemaName
}
