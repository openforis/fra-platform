import { CountryIso } from 'meta/area'
import { Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getOne } from './getOne'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  id: string
  year: string
  targetYear: string
}

export const updateYear = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, cycle, countryIso, id, targetYear } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const query = `
      update    ${schemaName}.original_data_point
      set       year = $2
      where     id = $1
  `
  await client.none(query, [id, targetYear])

  return getOne({ assessment, cycle, countryIso, year: String(targetYear) }, client)
}
