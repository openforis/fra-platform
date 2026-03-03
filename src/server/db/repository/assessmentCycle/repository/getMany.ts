import { AreaCode } from 'meta/area/areaCode'
import { CycleUuid } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  cycleUuid?: CycleUuid
  countryIso?: AreaCode
  global: boolean
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<RepositoryItem>> => {
  const { countryIso, cycleUuid, global } = props
  const countryCondition = global ? 'country_iso is null' : 'country_iso = $(countryIso)'
  const cycleCondition = cycleUuid ? 'and cycle_uuid = $(cycleUuid)' : ''

  return client.map<RepositoryItem>(
    `select * from public.repository
     where ${countryCondition}
       ${cycleCondition}
       and (props ->> 'hidden')::boolean is not true
     order by id`,
    { countryIso, cycleUuid },
    (row) => Objects.camelize(row)
  )
}
