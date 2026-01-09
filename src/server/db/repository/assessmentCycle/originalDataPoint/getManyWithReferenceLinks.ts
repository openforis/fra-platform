import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointAdapter } from 'server/db/repository/adapter/originalDataPoint'
import { Schemas } from 'server/db/schemas'

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

  const schemaName = Schemas.getNameCycle(assessment, cycle)
  const countryIsoCondition = countryIso ? 'and country_iso = $(countryIso)' : ''

  return client.map<OriginalDataPoint>(
    `
        select * from ${schemaName}.original_data_point
        where data_source_references ilike '%href%'
        ${countryIsoCondition}
    `,
    { countryIso },
    OriginalDataPointAdapter
  )
}
