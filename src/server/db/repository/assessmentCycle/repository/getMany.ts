import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso?: AreaCode
  global: boolean
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<RepositoryItem>> => {
  const { assessment, countryIso, cycle, global } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const condition = global ? 'country_iso is null' : 'country_iso = $1'

  return client.map<RepositoryItem>(
    `
      select *
      from ${schemaCycle}.repository
      where ${condition}
        and (props ->> 'hidden')::boolean is not true
      order by id
    `,
    [countryIso],
    (row) => Objects.camelize(row)
  )
}
