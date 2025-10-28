import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  colUuids: Array<string>
}

export const deleteMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, colUuids, countryIso, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.query(
    `delete
       from ${schemaCycle}.node n
       where n.country_iso = $1
         and n.col_uuid in ($2:list)`,
    [countryIso, colUuids]
  )
}
