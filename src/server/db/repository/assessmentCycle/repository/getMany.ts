import { Objects } from 'utils/objects'

import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'

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

  let condition = 'country_iso = $1'

  if (global) {
    condition = 'country_iso is null'
  }

  return client.map<RepositoryItem>(
    `
      select * from ${schemaCycle}.repository
      where
        ${condition} and (props ->> 'hidden')::boolean is not true
      order by id -- TODO: order by rowIndex
    `,
    [countryIso],
    (row) => Objects.camelize(row)
  )
}
