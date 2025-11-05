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
  countryIso: CountryIso
  id: string
  year: string
  targetYear: string
}

export const updateYear = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, countryIso, cycle, id, targetYear } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const query = `
      update    ${schemaName}.original_data_point
      set       year = $2
      where     id = $1
  `
  await client.none(query, [id, targetYear])

  return getOne({ assessment, cycle, countryIso, year: String(targetYear) }, client)
}
