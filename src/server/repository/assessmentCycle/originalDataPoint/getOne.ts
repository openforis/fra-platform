import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, OriginalDataPoint } from 'meta/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  year: string
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint | undefined> => {
  const { assessment, cycle, countryIso, year } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.oneOrNone<OriginalDataPoint>(
    `select * from ${schemaName}.original_data_point where country_iso = $1 and year = $2;`,
    [countryIso, year],
    Objects.camelize
  )
}
