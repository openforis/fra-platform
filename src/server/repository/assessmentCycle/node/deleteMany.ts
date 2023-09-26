import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  colUuids: Array<string>
}

export const deleteMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, countryIso, colUuids } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.query(
    `delete
       from ${schemaCycle}.node n
       where n.country_iso = $1
         and n.col_uuid in ($2:list)`,
    [countryIso, colUuids]
  )
}
