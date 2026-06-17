import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { getOne } from 'server/db/repository/assessmentCycle/originalDataPoint/getOne'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  id: string
  index: number
}

export const deleteNationalClass = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, cycle, id, index } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const { countryIso, year } = await client.one<{ countryIso: CountryIso; year: string }>(
    `
      update ${schemaName}.original_data_point odp
      set national_classes = national_classes - $2:raw
      where id = $1
      returning country_iso, year
  `,
    [id, Number(index)],
    // eslint-disable-next-line camelcase
    ({ country_iso, year }) => ({ countryIso: country_iso, year: String(year) })
  )

  return getOne({ assessment, cycle, countryIso, year }, client)
}
