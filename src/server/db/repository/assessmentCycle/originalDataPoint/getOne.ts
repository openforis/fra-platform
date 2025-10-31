import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  year: string
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint | undefined> => {
  const { assessment, countryIso, cycle, year } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.oneOrNone<OriginalDataPoint>(
    `select * from ${schemaName}.original_data_point where country_iso = $1 and year = $2;`,
    [countryIso, year],
    Objects.camelize
  )
}
