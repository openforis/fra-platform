import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

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
