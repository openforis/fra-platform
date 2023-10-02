import { Objects } from 'utils/objects'

import { CountryAdmin, CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'

import { getActivityLogQuery } from './query/getActivityLogQuery'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  limit: string
  offset: string
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<CountryAdmin>> => {
  const query = getActivityLogQuery(props)
  return client.map(query, [], (rows) => Objects.camelize(rows))
}
