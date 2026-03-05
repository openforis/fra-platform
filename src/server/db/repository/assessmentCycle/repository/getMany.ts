import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  countryIso?: AreaCode
  cycle: Cycle
  global: boolean
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<RepositoryItem>> => {
  const { assessment, countryIso, cycle, global } = props
  const assessmentUuid = assessment.uuid
  const cycleUuids = Cycles.getPreviousCycles({ assessment, cycle }).map((c) => c.uuid)
  const countryCondition = global ? 'country_iso is null' : 'country_iso = $(countryIso)'

  return client.map<RepositoryItem>(
    `
      select * from public.repository
      where assessment_uuid = $(assessmentUuid)
        and ${countryCondition}
        -- return only repository items from this and previous cycles
        and cycle_uuid in ($(cycleUuids:list))
        and (props ->> 'hidden')::boolean is not true
      order by id
    `,
    { assessmentUuid, countryIso, cycleUuids },
    (row) => Objects.camelize(row)
  )
}
