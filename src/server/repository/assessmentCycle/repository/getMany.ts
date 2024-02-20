import { Objects } from 'utils/objects'

import { AreaCode } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  global: boolean
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<RepositoryItem>> => {
  const { assessment, cycle, countryIso, global } = props
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
