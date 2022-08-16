import { Objects } from '@core/utils'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getMany = async (
  props: { assessment: Assessment; assessmentCycle: Cycle; countryIso: CountryIso },
  client: BaseProtocol = DB
): Promise<Array<OriginalDataPoint>> => {
  const { countryIso } = props
  const schemaName = Schemas.getNameCycle(props.assessment, props.assessmentCycle)

  return client.map<OriginalDataPoint>(
    `select * from ${schemaName}.original_data_point where country_iso = $1;`,
    [countryIso],
    (row) => Objects.camelize(row)
  )
}
