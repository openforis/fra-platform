import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { ActivityLog, Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { activityLogQuery } from 'server/repository/public/activityLog/activityLogQuery'

type Props = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  limit: string
  offset: string
}

export const getCycleDataActivities = (props: Props, client: BaseProtocol = DB): Promise<Array<ActivityLog<any>>> => {
  const { countryIso, assessment, cycle, limit, offset } = props

  const query = activityLogQuery({
    countryIso,
    assessment,
    cycle,
    limit,
    offset,
  })

  return client.map(query, [], (row) => Objects.camelize(row))
}
