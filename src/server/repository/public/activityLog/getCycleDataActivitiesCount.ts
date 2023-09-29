import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { TablePaginatedCount } from 'meta/tablePaginated'

import { BaseProtocol, DB } from 'server/db'
import { activityLogQuery } from 'server/repository/public/activityLog/activityLogQuery'

export const getCycleDataActivitiesCount = (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<TablePaginatedCount> => {
  const { countryIso, assessment, cycle } = props

  const query = activityLogQuery({
    countryIso,
    assessment,
    cycle,

    select: 'count(a.country_iso) as total',
  })

  return client.one(query, [], (res) => Objects.camelize(res))
}
