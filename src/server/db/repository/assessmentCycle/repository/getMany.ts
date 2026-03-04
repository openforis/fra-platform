import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  countryIso?: AreaCode
  global: boolean
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<RepositoryItem>> => {
  const { assessment, countryIso, global } = props
  const countryCondition = global ? 'country_iso is null' : 'country_iso = $(countryIso)'

  return client.map<RepositoryItem>(
    `
      select * from public.repository
      where assessment_uuid = $(assessmentUuid)
        and ${countryCondition}
        and (props ->> 'hidden')::boolean is not true
      order by id
    `,
    { assessmentUuid: assessment.uuid, countryIso },
    (row) => Objects.camelize(row)
  )
}
