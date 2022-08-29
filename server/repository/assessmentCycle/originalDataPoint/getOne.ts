import { Objects } from '@core/utils'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getOne = async (
  props: { assessment: Assessment; cycle: Cycle; countryIso: CountryIso; year: string },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { countryIso, year } = props
  const schemaName = Schemas.getNameCycle(props.assessment, props.cycle)

  return client.one<OriginalDataPoint>(
    `select * from ${schemaName}.original_data_point where country_iso = $1 and year = $2;`,
    [countryIso, year],
    Objects.camelize
  )
}
