import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointAdapter } from 'server/db/repository/adapter/originalDataPoint'
import { getNDPSelect } from 'server/db/repository/assessmentCycle/originalDataPoint/_getNDPSelect'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

export const getManyWithReferenceLinks = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<OriginalDataPoint>> => {
  const { assessment, countryIso, cycle } = props

  const countryIsoCondition = countryIso ? 'and odp.country_iso = $(countryIso)' : ''

  return client.map<OriginalDataPoint>(
    `
        ${getNDPSelect({ assessment, cycle })}
        where exists (select 1
              from jsonb_array_elements(d.value) elem
              where elem ->> 'type' ilike '%href%')
        ${countryIsoCondition}
    `,
    { countryIso },
    OriginalDataPointAdapter
  )
}
