import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getMaterializedViewName } from './_common/getMaterializedViewName'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export const refreshMaterializedView = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, countryIso } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const mvName = getMaterializedViewName(countryIso)

  return client.query(`refresh materialized view concurrently ${schemaCycle}.${mvName};`)
}
