import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { TablePaginatedCount } from 'meta/tablePaginated'

import { BaseProtocol, DB } from 'server/db'

import { getActivityLogQuery } from './query/getActivityLogQuery'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export const getCount = async (props: Props, client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
  const query = getActivityLogQuery({ ...props, select: 'count(*) as total' })

  return client.one(query, [], (res) => Objects.camelize(res))
}
